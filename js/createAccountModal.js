// Get the modal
var modal = document.getElementById("createAccountModal");

// Get the button that opens the modal
var btn = document.getElementById("createAccountButton");

// Get the <span> element that closes the modal
var span = document.getElementById("accountXBtn");

// When the user clicks the button, open the modal
btn.onclick = function () {
  modal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

//get information from modal
async function createNewUser() {
  let userEmail = document.getElementById("newEmail").value;
  let pw = document.getElementById("newPw").value;
  let verifyPw = document.getElementById("verifyPw").value;
  let userSchool = document.getElementById("school").value;
  let userName = document.getElementById("username").value;
  let userMajorsString = document.getElementById("majors").value;
  let userMajors = userMajorsString.split(", ");
  let igusername = document.getElementById('igUsername').value;
  let igpassword = document.getElementById('igPassword').value;

  let fieldsPopulated = false;
  let passwordsMatch = false;

  if (pw.localeCompare(verifyPw) != 0) {
    //code to say password doesn't match
    document.getElementById("verifyPwWarning").innerHTML =
      "Passwords don't match";
    document.getElementById("verifyPwWarning").style.display = "block";
    console.log("Passwords don't match");
  } else {
    document.getElementById("verifyPwWarning").style.display = "none";
    passwordsMatch = true;
  }
  //let url = "http://127.0.0.1:3000/user";
  let url = "https://csci430-node-server.azurewebsites.net/user"

  if (userEmail.localeCompare("") === 0) {
    document.getElementById("emailWarning").innerHTML = "Email is required";
    document.getElementById("emailWarning").style.display = "block";
  } else if (userEmail.localeCompare("") > 0) {
    document.getElementById("emailWarning").style.display = "none";
  }
  if (pw.localeCompare("") === 0) {
    document.getElementById("pwWarning").innerHTML = "Password is required";
    document.getElementById("pwWarning").style.display = "block";
  } else if (pw.localeCompare("") > 0) {
    document.getElementById("pwWarning").style.display = "none";
  }
  if (userSchool.localeCompare("") === 0) {
    document.getElementById("schoolWarning").innerHTML = "School is required";
    document.getElementById("schoolWarning").style.display = "block";
  } else if (userSchool.localeCompare("") > 0) {
    document.getElementById("schoolWarning").style.display = "none";
  }
  if (userName.localeCompare("") === 0) {
    document.getElementById("usernameWarning").innerHTML =
      "Username is required";
    document.getElementById("usernameWarning").style.display = "block";
  } else if (userName.localeCompare("") > 0) {
    document.getElementById("usernameWarning").style.display = "none";
  }

  if (
    userEmail.localeCompare("") > 0 &&
    pw.localeCompare("") > 0 &&
    userSchool.localeCompare("") > 0 &&
    userName.localeCompare("") > 0 &&
    passwordsMatch === true
  ) {
    fieldsPopulated = true;
  }

  const data = {
    email: userEmail,
    username: userName,
    password: pw,
    school: userSchool,
    majors: userMajors,
    ig_username: igusername,
    ig_password: igpassword,
  };

  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  if (fieldsPopulated === true) {
    let response = await fetch(url, options);

    if (response.status == 201) {
      console.log("User created!");
      console.log("Please login with your new credentials");

      modal.style.display = "none";
      openVerifyEmailModal();
    } else if (response.status == 400) {
      console.log("Unsuccessful");
    }
  }
}

function openVerifyEmailModal() {
  // Get the modal
  var modal = document.getElementById("verifyEmailModal");

  // Get the <span> element that closes the modal
  var span = document.getElementById("verifyXBtn");

  // When the user clicks the button, open the modal
    modal.style.display = "block";

  // When the user clicks on <span> (x), close the modal
  span.onclick = function () {
    modal.style.display = "none";
  };

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
}
