var messageModal = document.getElementById("messageModal");
var messageXBtn = document.getElementById("messageXBtn");

let messageFooter = document.getElementById("messageModalFooter");
messageFooter.style.display = "flex";
messageFooter.style.flexDirection = "column";

let messageResultMessage = document.getElementById("messageResultMessage");

messageXBtn.onclick = function () {
  messageModal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == messageModal) {
    messageModal.style.display = "none";
  }
};

async function messageUser() {
  let messageSubject = document.getElementById("messageSubject").value;
  let messageBody = document.getElementById("messageBody").value;

  console.log(messageSubject);
  console.log(messageBody);

  //let url = `http://127.0.0.1:3000/user/notification`;
  let url = `https://csci430-node-server.azurewebsites.net/user/notification`;

  let data = {
    sender: localStorage.getItem("userID"),
    receiver: localStorage.getItem("messageReceiverId"),
    subject: messageSubject,
    body: messageBody,
    notificationType: "Message",
    dealtWith: false,
  };

  console.log(data);

  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  let response = await fetch(url, options);
  let body = await response.json();

  console.log(body);

  if (response.status === 201) {
    console.log("message sent");
    messageResultMessage.innerHTML = "Message Sent!";
    messageResultMessage.style.display = "block";

    console.log('checking for notification id');
    console.log(localStorage.getItem('notificationId'));

    if (!(localStorage.getItem("notificationId") === null)) {
      //url = `http://127.0.0.1:3000/notification/dealtWithStatus`;
      url = `https://csci430-node-server.azurewebsites.net/notification/dealtWithStatus`;

      userObject = {
        notificationId: localStorage.getItem('notificationId'),
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
      console.log("Unable to deal with: " + localStorage.getItem('notificationId'));
    }
  } else {
    console.log("Didnt send");
    messageResultMessage.style.color = "red";
    messageResultMessage.innerHTML = "Unable to send...";
  }
}
