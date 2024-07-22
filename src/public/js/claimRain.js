document.addEventListener("DOMContentLoaded", function () {
  const claimButton = document.getElementById("claim-chucoin");
  let currentRainId = null;
  let canClaim = false;

  function updateButtonState(rainData) {
    console.log("Updating button state with rain data:", rainData);

    if (!rainData) {
      claimButton.disabled = true;
      canClaim = false;
      currentRainId = null;
      console.log("No rain information available");
      return;
    }

    if (rainData.status === "active") {
      claimButton.disabled = false;
      canClaim = true;
      currentRainId = rainData.id;
      console.log("Rain is active, button enabled");
    } else {
      claimButton.disabled = true;
      canClaim = false;
      currentRainId = null;
      console.log("Rain is not active, button disabled");
    }
  }

  const socket = io();
  
  socket.on("connect", () => {
    console.log("Connected to server");
    socket.emit("requestCurrentData");
  });

  socket.on("rainData", (data) => {
    console.log("Received rain data:", data);
    updateButtonState(data);
  });

  socket.on("currentData", (data) => {
    console.log("Received current data:", data);
    updateButtonState(data);
  });

  claimButton.addEventListener("click", async function () {
    if (!canClaim) {
      alert("There is no active rain to claim at the moment.");
      return;
    }

    try {
      const response = await fetch("/api/v1/users/updateCoins", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rainId: currentRainId,
        }),
      });

      const data = await response.json();

      if (response.ok && data.status === "success") {
        alert("Coin claimed successfully!");
        claimButton.disabled = true;
        canClaim = false;
      } else {
        throw new Error(data.message || "Failed to claim coin");
      }
    } catch (error) {
      console.error("Error claiming coin:", error);
      alert(error.message || "Error claiming coin. Please try again.");
    }
  });
});