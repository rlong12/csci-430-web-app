// Get the modal
var spUpdateIgModal = document.getElementById("updateIgModal");

// Get the button that opens the modal
var spUpdateIgBtn = document.getElementById("updateIgButton");

// Get the <span> element that closes the modal
var spUpdateIgSpan = document.getElementById("updateIgXBtn");

// When the user clicks the button, open the modal
spUpdateIgBtn.onclick = function () {
    spUpdateIgModal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
spUpdateIgSpan.onclick = function () {
    spUpdateIgModal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == spUpdateIgModal) {
    spUpdateIgModal.style.display = "none";
  }
};

//get information from modal
async function updateIgInfo() {
  let fieldsPopulated = false;

  let username = document.getElementById("newIgUsername").value;
  let pw = document.getElementById("newIgPassword").value;

  let url = "http://127.0.0.1:3000/user/sp/insta";
  //let url = "https://csci430-node-server.azurewebsites.net/user/sp/insta"

  const data = {
    ig_username: username,
    ig_password: pw,
  };

  const options = {
    method: "PATCH",
    headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
    },
    body: JSON.stringify(data),
  };

 
    let response = await fetch(url, options);

    if (response.status == 200) {
      console.log("Instagram info updated!");

      spUpdateIgModal.style.display = "none";
    } else if (response.status == 400) {
      console.log("Unsuccessful");
    }
  
}
