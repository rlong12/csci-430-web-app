//handles requerying on entry to main screen
if(localStorage.getItem('lastQuery') === null) {
    localStorage.setItem('lastQuery', 'https://csci430-node-server.azurewebsites.net/studygroups?mine=true&member=true');
}
requery();

var inviteModal = document.getElementById("inviteModal");
var inviteXBtn = document.getElementById("inviteXBtn");

let footer = document.getElementById("inviteModalFooter");
let resultMessage = document.getElementById("resultMessage");

inviteXBtn.onclick = function () {
  inviteModal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == inviteModal) {
    inviteModal.style.display = "none";
  }
};

async function inviteUser() {
    resultMessage.style.display = "none";

    let receiverEmail = document.getElementById('inviteEmail').value;

  //let url = `http://127.0.0.1:3000/user/notification`;
  let url = `https://csci430-node-server.azurewebsites.net/user/notification`;

  let data = {
    sender: localStorage.getItem('userID'),
    receiver: receiverEmail,
    studyGroupId: localStorage.getItem('studyGroupID'),
    notificationType: 'Invite',
  };

  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  let response = await fetch(url, options);

  if(response.status === 201) {
    resultMessage.innerHTML = "Invited!";
    resultMessage.style.display = "block";
  }
  else {
    resultMessage.innerHTML = "Was unable to invite...";
    resultMessage.style.display = "block";
  }
}
