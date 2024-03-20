let modal = document.getElementById("createPostModal");

async function postToSocials() {
  let mediaText = document.getElementById("mediaText").value;
  let imageUrl = localStorage.getItem('imageUrl');

  const data = {
    caption: mediaText,
    image_url: imageUrl
  };

  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("spToken")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  let igCheckbox = document.getElementById("instagram-chkBox");

  if (igCheckbox.checked === true) {
    let url = "http://127.0.0.1:3000/user/sp/insta-post";
    //let url = "https://csci430-node-server.azurewebsites.net/user/sp/insta-post";

    let response = await fetch(url, options);

    if (response.status === 201) {
      console.log("instagram post possibly successful");
      modal.style.display = "none";
    } else {
      console.log("something went wrong");
    }
  }
}