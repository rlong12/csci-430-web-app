var messageModal = document.getElementById("messageModal");
var messageXBtn = document.getElementById("messageXBtn");

let messageFooter = document.getElementById("messageModalFooter");
messageFooter.style.display = 'flex';
messageFooter.style.flexDirection = 'column';

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
    let messageSubject = document.getElementById('messageSubject').value;
    let messageBody = document.getElementById('messageBody').value;

    console.log(messageSubject);
    console.log(messageBody);

  //let url = `http://127.0.0.1:3000/user/notification`;
  let url = `https://csci430-node-server.azurewebsites.net/user/notification`;

  let data = {
    sender: localStorage.getItem('userID'),
    receiver: localStorage.getItem("messageReceiverId"),
    subject: messageSubject,
    body: messageBody,
    notificationType: 'Message',
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

  if(response.status === 201) {
    console.log('message sent')
    messageResultMessage.innerHTML = "Message Sent!";
    messageResultMessage.style.display = 'block';
  }
  else {
    console.log('Didnt send');
    messageResultMessage.style.color = 'red';
    messageResultMessage.innerHTML = "Unable to send...";
  }
}