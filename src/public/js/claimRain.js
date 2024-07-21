document.addEventListener("DOMContentLoaded", function () {
  const claimButton = document.getElementById("claim-chucoin");

  claimButton.addEventListener("click", async function () {
    try {
      const response = await fetch("/api/v1/users/updateCoins", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          coins: 1,
          claimedRains: 1,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to claim coin");
      }

      const data = await response.json();

      if (data.status === "success") {
        alert("Coin claimed successfully!");
        // Aquí puedes actualizar la interfaz de usuario si es necesario
      } else {
        throw new Error("Failed to claim coin");
      }
    } catch (error) {
      console.error("Error claiming coin:", error);
      alert("Error claiming coin. Please try again.");
    }
  });
});
