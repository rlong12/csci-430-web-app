// Get the modal
var editAccountModal = document.getElementById("editAccountModal");

// Get the button that opens the modal
var editAccountButton = document.getElementById("editAccountButton");

// Get the <span> element that closes the modal
var editAccountXBtn = document.getElementById("editAccountXBtn");

// When the user clicks the button, open the modal
editAccountButton.onclick = function () {
  loadProfile();
  editAccountModal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
editAccountXBtn.onclick = function () {
  editAccountModal.style.display = "none";
};

let p = document.getElementById("editAccountResult");

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == editAccountModal) {
    editAccountModal.style.display = "none";
  }
};

async function loadProfile() {
  let userEmail = document.getElementById("newEmail");
  //let pw = document.getElementById("newPw");
  let userSchool = document.getElementById("editAccountSchool");
  let userName = document.getElementById("username");
  let userMajorsInput = document.getElementById("majors");
  let igusername = document.getElementById("igUsername");
  let igpassword = document.getElementById("igPassword");

  let user = JSON.parse(localStorage.getItem("user"));

    console.log(JSON.parse(localStorage.getItem('user')));

  userEmail.value = user.email;
  //pw.value = user.password;
  userSchool.value = user.school;
  userName.value = user.username;
  igusername.value = user.ig_username;
  igpassword.value = user.ig_password;

  console.log(user.majors);

  if (user.majors) {
    if (user.majors.length > 0) {
      userMajorsInput.value = loadMajors(user.majors);
    }
  }
}

function loadMajors(majors) {
  let majorsString = "";
  for (let i = 0; i < majors.length; i++) {
    if (i === 0) {
      majorsString += majors[i];
    } else {
      majorsString += ", " + majors[i];
    }
  }
  return majorsString;
}

//get information from modal
async function editUser() {
  p.style.display = "none";

  let userEmail = document.getElementById("newEmail").value;
  //let pw = document.getElementById("newPw").value;
  let userSchool = document.getElementById("editAccountSchool").value;
  let userName = document.getElementById("username").value;
  let userMajorsString = document.getElementById("majors").value;
  let userMajors = userMajorsString.split(", ");
  let igusername = document.getElementById("igUsername").value;
  let igpassword = document.getElementById("igPassword").value;

  

  let passwordsMatch = false;

  let url = "http://127.0.0.1:3000/user";
  //let url = "https://csci430-node-server.azurewebsites.net/user";

  const data = {
    username: userName,
    school: userSchool,
    majors: userMajors,
    ig_password: igpassword,
    ig_username: igusername,
  };

  const options = {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  console.log(options)
  console.log(data);

  let response = await fetch(url, options);
  let body = await response.json();

  if (response.status == 200) {
    console.log("User updated!");
    localStorage.setItem('user', JSON.stringify(body));
    loadProfile();
  } else if (response.status == 400) {
    console.log("Unsuccessful");
    p.innerHTML = "Unable to save...";
    p.style.display = "block";
  }
}
