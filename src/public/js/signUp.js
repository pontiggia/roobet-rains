document.querySelector(".form").addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.querySelector("#signup__email").value;
    const name = document.querySelector("#signup__username").value;  
    const password = document.querySelector("#signup__password").value;
    const passwordConfirm = document.querySelector("#signup__passwordConfirm").value;

    if (!email.match(/^[^@]+@[^@]+\.[^@]+$/)) {
        alert("Please enter a valid email address.");
        return;
    }
    // check that username only contains letters
    if (!name.match(/^[a-zA-Z]+$/)) {
        alert("Username must only contain letters.");
        return;
    }
    if (password !== passwordConfirm) {
        alert("Passwords do not match.");
        return;
    }
    fetch("/api/v1/users/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, name, password, passwordConfirm }),
    })
    .then((response) => response.json())
    .then((data) => {
        if (data.status === "fail") {
          alert("Incorrect username or password.");
        } else {
          setTimeout(() => {
            window.location.href = "/";
          }, 1000);
        }
    })
    .catch((error) => {
        console.error("Signup failed:", error);
        alert("An error occurred. Please try again.");
    });
});