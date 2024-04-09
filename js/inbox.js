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

function loadNotifications(data) {
  console.log(data);

  let notificationsList = document.getElementById("notificationsListDiv");

  let notificationContainer = document.createElement('div');
  notificationContainer.className = 'notification';

  let innerContainer = document.createElement('div');
  innerContainer.className = 'notificationContent';

  let sender = document.createElement('p');
  sender.innerHTML = 'From: ' + data.sender_name;
  sender.style.padding = '0px';
  let subject = document.createElement('h4');
  subject.innerHTML = data.subject;
  subject.style.padding = '0px';
  let body = document.createElement('p');
  body.innerHTML = data.body;
  body.style.padding = '0px';

  innerContainer.appendChild(sender);
  innerContainer.appendChild(subject);
  innerContainer.appendChild(body);

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

  let response = await fetch(url, options);
  let body = await response.json();

  if(response.status === 200) {
    clearNotifications();
    document.getElementById('notificationsListDiv').style.display = 'block';
    document.getElementById('notificationsErrorMessage').style.display = 'none';
    for(let i=0; i<body.length; i++) {
    loadNotifications(body[i]);
    }
  }
  else {
    document.getElementById('notificationsListDiv').style.display = 'none';
    document.getElementById('notificationsErrorMessage').style.display = 'block';
  }
}
