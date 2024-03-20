// Get the modal
var spCreateAccountModal = document.getElementById("createAccountModal");

// Get the button that opens the modal
var spCreateAccountBtn = document.getElementById("createAccountButton");

// Get the <span> element that closes the modal
var spCreateAccountSpan = document.getElementById("createAccountXBtn");

// When the user clicks the button, open the modal
spCreateAccountBtn.onclick = function () {
  spCreateAccountModal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
spCreateAccountSpan.onclick = function () {
  spCreateAccountModal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == spCreateAccountModal) {
    spCreateAccountModal.style.display = "none";
  }
};

//get information from modal
async function createNewSpUser() {
  let fieldsPopulated = false;

  let phoneNum = document.getElementById("newPhone").value;
  let pw = document.getElementById("newPassword").value;
  let igUsername = document.getElementById("newIgUsername").value;
  let igPassword = document.getElementById("newIgPw").value;

  let url = "http://127.0.0.1:3000/user/sp";
  //let url = "https://csci430-node-server.azurewebsites.net/user/sp"

  if (phoneNum.localeCompare("") === 0) {
    document.getElementById("phoneWarning").innerHTML =
      "Phone number is required";
    document.getElementById("phoneWarning").style.display = "block";
  } else if (phoneNum.localeCompare("") > 0) {
    document.getElementById("phoneWarning").style.display = "none";
  }
  if (pw.localeCompare("") === 0) {
    document.getElementById("pwWarning").innerHTML = "Password is required";
    document.getElementById("pwWarning").style.display = "block";
  } else if (pw.localeCompare("") > 0) {
    document.getElementById("pwWarning").style.display = "none";
  }

  const data = {
    phone_number: phoneNum,
    password: pw,
    ig_username: igUsername,
    ig_password: igPassword,
  };

  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  if (phoneNum.localeCompare("") != 0 && pw.localeCompare("") != 0) {
    fieldsPopulated = true;
  }

  if (fieldsPopulated) {
    let response = await fetch(url, options);

    if (response.status == 201) {
      console.log("User created!");
      console.log("Please login with your new credentials");

      spCreateAccountModal.style.display = "none";
    } else if (response.status == 400) {
      console.log("Unsuccessful");
    }
  }
}
