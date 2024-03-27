import * as SECRETS from "./twitter-secrets.js";
console.log(SECRETS);

console.log(
  "twitter_authenticated: " + localStorage.getItem("twitter-authenticated")
);

let modal = document.getElementById("createPostModal");

async function postToSocials() {
  let mediaText = document.getElementById("mediaText").value;
  let imageUrl = localStorage.getItem("imageUrl");

  const data = {
    caption: mediaText,
    image_url: imageUrl,
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
    //let url = "http://127.0.0.1:3000/user/sp/insta-post";
    let url =
      "https://csci430-node-server.azurewebsites.net/user/sp/insta-post";

    let response = await fetch(url, options);

    if (response.status === 201) {
      console.log("instagram post possibly successful");
      modal.style.display = "none";
    } else {
      console.log("something went wrong");
    }
  }

  //post to twitter
  document.querySelector("#postButton").addEventListener("click", async () => {
    if (document.getElementById("instagram-chkBox").checked === false) {
      return;
    }

    console.log("tweet button clicked");

    const text =
      document.querySelector("#mediaText").value ||
      "Hello from Social Pot! Posted via API server!";
    localStorage.setItem("tweet-text", text);

    //const redirect_url = `https://n0code.net/work/teaching/courses/csci430/studybuddy/twitter-redirect.html`
    //let redirect_url = `http://127.0.0.1:5500/web-app/twitter-redirect.html`;
    let redirect_url = `https://ambitious-ocean-09c0b6d0f.4.azurestaticapps.net/twitter-redirect.html`;
    console.log("redirect url: " + redirect_url);

    const twitter_authenticated = localStorage.getItem("twitter-authenticated");
    console.log(twitter_authenticated);

    if (twitter_authenticated) {
      location.href = `${redirect_url}?twitter-authenticated=true`;
    } else {
      location.href = `https://twitter.com/i/oauth2/authorize?response_type=code&client_id=${SECRETS.OAUTH2_CLIENT_ID}&redirect_uri=${redirect_url}&scope=tweet.read%20tweet.write%20users.read%20offline.access&state=state&code_challenge=challenge&code_challenge_method=plain`;
    }
  });
}
