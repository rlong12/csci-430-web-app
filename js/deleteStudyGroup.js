var confirmDeleteModal = document.getElementById("confirmDeleteModal");
var deleteStudyGroupButton = document.getElementById("deleteStudyGroupButton");
var confirmDeleteXBtn = document.getElementById("confirmDeleteXBtn");

confirmDeleteXBtn.onclick = function () {
    confirmDeleteModal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == confirmDeleteModal) {
    confirmDeleteModal.style.display = "none";
  }
};

let confirmNoButton = document.getElementById("confirmNoBtn");
confirmNoButton.onclick = function() {
    localStorage.removeItem("deleteStudyGroupId");
    confirmDeleteModal.style.display = "none";
}

async function deleteStudyGroup() {
    let id = localStorage.getItem("deleteStudyGroupId");

    let url = `http://127.0.0.1:3000/studygroup/${id}`;
    //let url = `https://csci430-node-server.azurewebsites.net/studygroup/${data._id}`;

    const options = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    let response = await fetch(url, options);

    if (response.status === 200) {
      console.log("Study group deleted!");
      let successMessage = document.createElement("p");
      successMessage.innerHTML = "Study Group deleted.";
      successMessage.style.color = "red";
      let footer = document.getElementById("confirmDeleteFooter");
      footer.appendChild(successMessage);
      requery();
    } else {
      console.log("Unable to delete study group");
    }
  };