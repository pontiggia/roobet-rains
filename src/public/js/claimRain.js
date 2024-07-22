document.addEventListener("DOMContentLoaded", function () {
  const claimButton = document.getElementById("claim-chucoin");
  let currentRainId = null;
  let canClaim = false;

  // Función para actualizar el estado del botón
  function updateButtonState(rainData) {
    if (!rainData) {
      claimButton.disabled = true;
      canClaim = false;
      currentRainId = null;
      alert("No rain information available at the moment.");
      return;
    }

    if ((rainData.status === "active" || rainData.status === "countdown") && rainData.id !== currentRainId) {
      claimButton.disabled = false;
      canClaim = true;
      currentRainId = rainData.id;
    } else if (rainData.status !== "active") {
      claimButton.disabled = true;
      canClaim = false;
      currentRainId = null;
      alert(
        "There is no active rain at the moment. Please wait for the next one!"
      );
    }
  }

  // Escuchar los eventos de rain
  const socket = io();
  socket.on("rainData", updateButtonState);

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
