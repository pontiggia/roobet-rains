document.querySelector(".form").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.querySelector("#login__email").value;
  const password = document.querySelector("#login__password").value;

  // check that email is valid
  if (!email.match(/^[^@]+@[^@]+\.[^@]+$/)) {
    alert("Please enter a valid email address.");
    return;
  }
  // check that password contains only letters and numbers
  if (!password.match(/^[a-zA-Z0-9]+$/)) {
    alert("Password must only contain letters and numbers.");
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
