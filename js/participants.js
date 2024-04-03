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

let removeParticipants = [];

async function loadParticipants(participants) {
    console.log('in loadParticipants');
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
    console.log('in for loop');

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
      deleteButton.innerHTML = "Remove";
      deleteButton.className = "button";
      deleteButton.style.scale = "70%";
      deleteButton.style.backgroundColor = "red";

      deleteButton.onclick = function () {
        console.log('adding participant to list');

        deleteButton.style.display = 'none';
        let warning = document.getElementById('removeText');
        warning.innerHTML = 'Save Changes to remove';
        warning.style.scale = '70%';
        warning.style.marginLeft = '10px';

        console.log('participants array: ' + participants);

        removeParticipants.push(participants[numParticipants]);
        console.log(participants[numParticipants])
      };

      let p = document.createElement("p");
      p.innerHTML = body.username;

      let removeText = document.createElement('p');
      removeText.id = 'removeText';

      participantDiv.appendChild(p);
      participantDiv.appendChild(deleteButton);
      participantDiv.appendChild(removeText);
      participantDiv.style.display = "flex";
      participantDiv.style.flexDirection = "row";
      participantDiv.style.alignItems = "center";
      participantDiv.style.justifyContent = 'center';

      innerDiv.appendChild(participantDiv);
    } else {
      console.log(
        "Couldn't get user with id: " + participants[numParticipants]
      );
    }
    div.appendChild(innerDiv);
  }
}

let successful = true;

async function editParticipants() {
  for (let i = 0; i < removeParticipants.length; i++) {
    //let url = `http://127.0.0.1:3000/studygroup/${localStorage.getItem("studyGroupID")}/participants?remove=true`;
    let url = `https://csci430-node-server.azurewebsites.net//studygroup/${localStorage.getItem("studyGroupID")}/participants?remove=true`;

    console.log(url);
    console.log(removeParticipants);

    let id = removeParticipants[i];
    let data = {
        userId: id
    }

    console.log(data);

    const options = {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };
    

    let response = await fetch(url, options);

    if (response.status === 200) {
        console.log('successfully removed particpant(s)');
    }
    else {
        console.log(response);
        successful = false;
    }
  }

  if(successful) {
    participantsModal.style.display = 'none';
    editStudyGroupModal.style.display = 'none';
    requery();
  }
}
