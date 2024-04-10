var inboxModal = document.getElementById("inboxModal");
var inboxXBtn = document.getElementById("inboxXBtn");
var inboxButton = document.getElementById("inboxButton");

inboxButton.onclick = function () {
  inboxModal.style.display = "block";
  getNotifications();
};

inboxXBtn.onclick = function () {
  inboxModal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == inboxModal) {
    inboxModal.style.display = "none";
  }
};

function clearNotifications() {
  let notificationsDiv = document.getElementById("notificationsListDiv");
  while (notificationsDiv.firstChild) {
    notificationsDiv.removeChild(notificationsDiv.lastChild);
  }
}

function removeInviteButtons(inviteButtonsDiv) {
  while (inviteButtonsDiv.firstChild) {
    inviteButtonsDiv.removeChild(inviteButtonsDiv.lastChild);
  }
}

function loadNotifications(data) {
  console.log(data);

  let notificationsList = document.getElementById("notificationsListDiv");

  let notificationContainer = document.createElement("div");
  notificationContainer.className = "notification";

  if(data.isRead === true) {
    notificationContainer.style.backgroundColor = '#f3f3f3';
  }

  let innerContainer = document.createElement("div");
  innerContainer.className = "notificationContent";

  let sender = document.createElement("p");
  sender.innerHTML = "From: " + data.sender_name;
  sender.style.padding = "0px";
  let subject = document.createElement("h4");
  subject.innerHTML = data.subject;
  subject.style.padding = "0px";
  let body = document.createElement("p");
  body.innerHTML = data.body;
  body.style.padding = "0px";

  innerContainer.appendChild(sender);
  innerContainer.appendChild(subject);
  innerContainer.appendChild(body);

  console.log("checking notification type and dealtWith");

  console.log(data.notificationType);
  console.log(data.dealtWith);

  if (data.notificationType === "Invite" && data.dealtWith === false) {
    console.log("invite not dealt with");
    let inviteButtonsDiv = document.createElement("div");
    inviteButtonsDiv.className = "inviteButtonsDiv";

    let acceptButton = document.createElement("button");
    acceptButton.className = "button";
    acceptButton.innerHTML = "Accept";
    acceptButton.style.backgroundColor = "#5cb85c";
    acceptButton.onclick = async function () {
      //let url = `http://127.0.0.1:3000/studygroup/${data.studyGroupId}/participants?add=true`;
      let url = `https://csci430-node-server.azurewebsites.net/studygroup/${data.studyGroupId}/participants?add=true`;

      let userObject = {
        userId: localStorage.getItem("userID"),
        notificationId: data._id,
      };

      console.log(userObject);

      const options = {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userObject),
      };

      console.log(url, options);
      console.log("Requesting to join group");

      let response = await fetch(url, options);

      if (response.status === 200) {
        console.log("Join successful");
        removeInviteButtons(inviteButtonsDiv);
        let successMessage = document.createElement("p");
        successMessage.innerHTML = "Invite Accepted!";
        successMessage.style.color = "#5cb85c";
        successMessage.style.scale = "80%";
        inviteButtonsDiv.appendChild(successMessage);
        console.log("successfully accepted invite");

        //url = `http://127.0.0.1:3000/notification/dealtWithStatus`;
        url = `https://csci430-node-server.azurewebsites.net/notification/dealtWithStatus`;

        userObject = {
          notificationId: data._id,
        };

        console.log(userObject);

        let dealOptions = {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userObject),
        };

        console.log(url, dealOptions);
        console.log("Dealing with notification");

        response = await fetch(url, dealOptions);

        if (response.status === 200) {
          console.log("Notification " + data._id + " dealt with");
        }
      } else {
        console.log("Unable to join group");
        let p = document.createElement("p");
        p.innerHTML = "Unable to join group. Reload inbox and try again.";
        p.style.color = "orange";
        p.style.scale = "80%";
        inviteButtonsDiv.appendChild(p);
      }
    };
    console.log("appending button");
    inviteButtonsDiv.appendChild(acceptButton);

    let declineButton = document.createElement("button");
    declineButton.className = "button";
    declineButton.innerHTML = "Decline";
    declineButton.onclick = async function () {
        //let url = `http://127.0.0.1:3000/notification/dealtWithStatus`;
        let url = `https://csci430-node-server.azurewebsites.net/notification/dealtWithStatus`;

        let userObject = {
          notificationId: data._id,
        };

        console.log(userObject);

        let dealOptions = {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userObject),
        };

        console.log(url, dealOptions);
        console.log("Dealing with notification");

      let response = await fetch(url, dealOptions);

        if (response.status === 200) {
          removeInviteButtons(inviteButtonsDiv);
        let successMessage = document.createElement("p");
        successMessage.innerHTML = "Declined Invite!";
        successMessage.style.color = "orange";
        inviteButtonsDiv.appendChild(successMessage);
        console.log("successfully declined invite");

          console.log("Notification " + data._id + " dealt with");
        }
        else {
          let body = await response.json();
          console.log(body);
        }
    };
    declineButton.style.backgroundColor = "red";
    inviteButtonsDiv.appendChild(declineButton);

    innerContainer.appendChild(inviteButtonsDiv);
  }
  else {
    let p = document.createElement('p');
    p.innerHTML = "No action needed.";
    p.style.color = "#5cb85c"
    p.style.alignSelf = 'center';
    p.style.scale = "80%";
    innerContainer.appendChild(p);
  }

  notificationContainer.appendChild(innerContainer);

  notificationsList.appendChild(notificationContainer);
}

async function getNotifications() {
  //let url = `http://127.0.0.1:3000/notifications`;
  let url = `https://csci430-node-server.azurewebsites.net/notifications`;

  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  console.log("Getting notifications");

  let response = await fetch(url, options);
  let body = await response.json();

  if (response.status === 200 && body.length > 0) {
    console.log("Loading notifications");
    console.log(body);
    clearNotifications();
    document.getElementById("notificationsListDiv").style.display = "block";
    document.getElementById("notificationsErrorMessage").style.display = "none";
    for (let i = 0; i < body.length; i++) {
      loadNotifications(body[i]);
    }
  } else {
    document.getElementById("notificationsListDiv").style.display = "none";
    document.getElementById("notificationsErrorMessage").style.display =
      "block";
  }
}
