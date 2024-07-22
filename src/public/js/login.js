document.querySelector(".form").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.querySelector("#login__email").value;
  const password = document.querySelector("#login__password").value;

  // check that email is valid
  if (!email.match(/^[^@]+@[^@]+\.[^@]+$/)) {
    alert("Please enter a valid email address.");
    return;
  }

  fetch("/api/v1/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (data.status === "fail") {
        alert("Usuario o contraseña incorrectos");
      } else {
        setTimeout(() => {
          window.location.href = "/";
        }, 1000);
      }
    })
    .catch((error) => {
      console.log(error);
    });
});
