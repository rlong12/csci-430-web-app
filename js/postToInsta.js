var postInstaModal = document.getElementById("postInstaModal");
var postInstaXBtn = document.getElementById("postInstaXBtn");

let postInstaFooter = document.getElementById("postInstaFooter");
let instaResultMessage = document.getElementById("instaResultMessage");

let fromCreate = true;

postInstaXBtn.onclick = function () {
  postInstaModal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == postInstaModal) {
    postInstaModal.style.display = "none";
  }
};

let studyGroupName = "";

function displayInstaModal(name) {
  instaResultMessage.style.display = "none";
  document.getElementById("postInstaStudyGroup").innerHTML =
    "You have joined " + name + "!";
  postInstaModal.style.display = "block";
  studyGroupName = name;
  fromCreate = false;
}

function displayInstaModalFromCreate(name) {
  instaResultMessage.style.display = "none";
  document.getElementById("postInstaStudyGroup").innerHTML =
    "You have created " + name + "!";
  postInstaModal.style.display = "block";
  studyGroupName = name;
  fromCreate = true;
}

function closeShareInstaModal() {
  postInstaModal.style.display = "none";
}

async function checkInstaInfo() {
  //let url = "http://127.0.0.1:3000/user";
  let url = "https://csci430-node-server.azurewebsites.net/user";

  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  let response = await fetch(url, options);
  let body = await response.json();
  console.log(body);
  console.log(body.ig_username, body.ig_password);
  localStorage.setItem("instagramUsername", body.ig_username);
  localStorage.setItem("instagramPassword", body.ig_passwords);

  try {
    if (
      body.ig_username === undefined ||
      body.ig_username === "" ||
      body.ig_password === undefined ||
      body.ig_password === ""
    ) {
      console.log("Insta info empty");
      return false;
    } else {
      console.log("Insta info found");
      return true;
    }
  } catch (e) {
    console.log(e);
    console.log("Unable to get user");
    return;
  }
}

async function shareToInsta() {
  let imageUrl = "https://upcdn.io/W142hJk/raw/demo/4kgZb1RC61.jpg";

  let data;

  if (fromCreate) {
    data = {
      caption:
        "I just created a new Study Group, " +
        studyGroupName +
        ". Come join it!",
      image_url: imageUrl,
    };
  } else {
    data = {
      caption: "I just joined a new Study Group, " + studyGroupName + "!",
      image_url: imageUrl,
    };
  }
  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  //let url = "http://127.0.0.1:3000/user/sp/insta-post";
  let url = "https://csci430-node-server.azurewebsites.net/user/sp/insta-post";

  let response = await fetch(url, options);

  if (response.status === 201) {
    console.log("instagram post successful!");
    instaResultMessage.innerHTML = "Shared to instagram!";
    instaResultMessage.style.display = "block";
  } else {
    console.log("something went wrong");
    instaResultMessage.innerHTML = "Failed to share...";
    instaResultMessage.style.display = "block";
  }
}
