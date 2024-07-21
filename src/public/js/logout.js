document.querySelector("#logout").addEventListener("click", (e) => {
    e.preventDefault();
  
    fetch("/api/v1/users/logout", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error en el logout");
        }
        return response.json();
      })
      .then((data) => {
        setTimeout(() => {
          window.location.href = "/";
        }, 1000);
      })
      .catch((error) => {
        console.log(error);
      });
  });