(()=>{"use strict";document.querySelector(".form").addEventListener("submit",(function(e){e.preventDefault();const r=document.querySelector("#signup__email").value,t=document.querySelector("#signup__username").value,a=document.querySelector("#signup__password").value,n=document.querySelector("#signup__passwordConfirm").value;r.match(/^[^@]+@[^@]+\.[^@]+$/)?t.match(/^[a-zA-Z]+$/)?a===n?fetch("/api/v1/users/signup",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:r,name:t,password:a,passwordConfirm:n})}).then((e=>e.json())).then((e=>{"fail"===e.status?alert("Incorrect username or password."):setTimeout((()=>{window.location.href="/"}),1e3)})).catch((e=>{console.error("Signup failed:",e),alert("An error occurred. Please try again.")})):alert("Passwords do not match."):alert("Username must only contain letters."):alert("Please enter a valid email address.")}))})();