document.addEventListener("DOMContentLoaded", function () {
  const claimButton = document.getElementById("claim-chucoin");
  let currentRainId = null;
  let canClaim = null;
  const audio = new Audio('../assets/sounds/alert.mp3');


  function updateButtonState(rainData) {

    if (!rainData) {
      claimButton.disabled = true;
      canClaim = false;
      currentRainId = null;
      return;
    }

    if (rainData.status === "active" || rainData.status === "countdown") {
      claimButton.disabled = false;
      canClaim = true;

      if (canClaim) {
        audio.play();
      }

      currentRainId = rainData.id;
    } else {
      claimButton.disabled = true;
      canClaim = false;
      currentRainId = null;
    }
  }

  const socket = io();

  socket.on("connect", () => {
    socket.emit("requestCurrentData");
  });

  socket.on("rainData", (data) => {
    updateButtonState(data);
  });

  socket.on("currentData", (data) => {
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
        location.reload();
      } else {
        throw new Error(data.message || "Failed to claim coin");
      }
    } catch (error) {
      console.error("Error claiming coin:", error);
      alert(error.message || "Error claiming coin. Please try again.");
    }
  });
});