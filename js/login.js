let loginEmailInput = document.getElementById("loginEmail");
let loginPasswordInput = document.getElementById("loginPassword");
loginEmailInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    login();
  }
});
loginPasswordInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    login();
  }
});

async function login() {
  let userName = document.getElementById("loginEmail").value;
  let userPassword = document.getElementById("loginPassword").value;

  let url = "http://127.0.0.1:3000/user/login";
  //let url = "https://csci430-node-server.azurewebsites.net/user/login"

  let data = {
    email: userName,
    password: userPassword,
  };

  let options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  let response = await fetch(url, options);

  if (response.status === 200) {
    document.querySelector("#loginError").style.display = "none";
    console.log("logged in successfully.");
    const body = await response.json();
    console.log(body);
    console.log(JSON.stringify(body.user));

    localStorage.setItem("user", JSON.stringify(body.user));
    localStorage.setItem("token", body.token);

    location.href = "main.html";
  } else if (response.status === 401) {
    console.log("failed to log in");
    document.querySelector("#loginError").innerHTML = "Email has not been validated.";
    document.querySelector("#loginError").style.display = "block";
  } else {
    console.log("error logging in");
    document.querySelector("#loginError").innerHTML = "Invalid credentials.";
    document.querySelector("#loginError").style.display = "block";
  }
}
