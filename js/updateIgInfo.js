// Get the modal
var updateIgModal = document.getElementById("updateIgModal");

// Get the <span> element that closes the modal
var updateIgSpan = document.getElementById("updateIgXBtn");

// When the user clicks on <span> (x), close the modal
function updateIgXBtnMethod() {
    updateIgModal.style.display = "none";
  try {
    clearInterval(localStorage.getItem('checkInstaInterval'));
  } catch (e) {
    console.log(e);
  }
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == updateIgModal) {
    updateIgModal.style.display = "none";
  }
};

function displayUpdateIgModal() {
    updateIgModal.style.display = 'block';
}

async function updateIgInfo() {
    document.getElementById("updateIgInfoResultMessage").innerHTML = "";

    //get information from modal
  let username = document.getElementById("newIgUsername").value;
  let pw = document.getElementById("newIgPassword").value;

  //let url = "http://127.0.0.1:3000/user/sp/insta";
  let url = "https://csci430-node-server.azurewebsites.net/user/sp/insta";

  const data = {
    ig_username: username,
    ig_password: pw,
  };

  const options = {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  console.log(data, options);

  let response = await fetch(url, options);

  if (response.status == 200) {
    console.log("Instagram info updated!");
    document.getElementById("updateIgInfoResultMessage").innerHTML =
      "Successfully saved info!";
      localStorage.setItem('instagramUsername', username);
      localStorage.setItem('instagramPassword', pw);

      let user = JSON.parse(localStorage.getItem("user"));

      user.ig_username = username;
      user.ig_password = pw;

      localStorage.setItem('user', JSON.stringify(user));

      return true;
  } else if (response.status == 400) {
    console.log("Unsuccessful");
    document.getElementById("updateIgInfoResultMessage").innerHTML =
      "Something went wrong...";
      return false;
  }
}
