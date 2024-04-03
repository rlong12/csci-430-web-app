var participantsModal = document.getElementById("participantsModal");
var participantsBtn = document.getElementById("participantsBtn");
var participantsXBtn = document.getElementById("participantsXBtn");

function clearParticipants() {
  let div = document.getElementById("participantsListDiv");
  while (div.firstChild) {
    div.removeChild(div.lastChild);
  }
}

participantsXBtn.onclick = function () {
  participantsModal.style.display = "none";
  clearParticipants();
};

window.onclick = function (event) {
  if (event.target == participantsModal) {
    participantsModal.style.display = "none";
    clearParticipants();
  }
};

async function loadParticipants(participants) {
  let div = document.getElementById("participantsListDiv");
  let innerDiv = document.createElement("div");

  if (participants === undefined || participants.length === 0) {
    div.innerHTML = "There are no participants for this group :(";
    return;
  }
  for (
    let numParticipants = 0;
    numParticipants < participants.length;
    numParticipants++
  ) {
    //let url = `http://127.0.0.1:3000/user/${participants[numParticipants]}`;
    let url = `https://csci430-node-server.azurewebsites.net/user/${participants[numParticipants]}`;

    const options = {
      method: "GET",
    };

    let response = await fetch(url, options);

    if (response.status === 200) {
      const body = await response.json();

      let participantDiv = document.createElement("div");

      let deleteButton = document.createElement("button");
      deleteButton.innerHTML = "Delete";
      deleteButton.className = "button";
      deleteButton.style.backgroundColor = "red";

      let p = document.createElement("p");
      p.innerHTML = body.username;

      participantDiv.appendChild(p);
      participantDiv.appendChild(deleteButton);
      participantDiv.style.display = "flex";
      participantDiv.style.flexDirection = "row";
      participantDiv.style.alignItems = "center";

      innerDiv.appendChild(participantDiv);
    } else {
      console.log(
        "Couldn't get user with id: " + participants[numParticipants]
      );
    }
    div.appendChild(innerDiv);
  }
}

async function editParticipants() {}
