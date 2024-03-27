import * as SECRETS  from "./twitter-secrets.js"
console.log(SECRETS)

console.log('twitter_authenticated: ' + localStorage.getItem('twitter-authenticated'))

document.querySelector("#tweetButton").addEventListener("click", async () => {

    console.log("tweet button clicked")

    const text = document.querySelector("#tweetText").value || "Hello from n0code! Posted via API server!"
    localStorage.setItem("tweet-text", text)

    
    //const redirect_url = `https://n0code.net/work/teaching/courses/csci430/studybuddy/twitter-redirect.html`
    //let redirect_url = `http://127.0.0.1:5500/web-app/twitter-redirect.html`;
    let redirect_url = `https://ambitious-ocean-09c0b6d0f.4.azurestaticapps.net/twitter-redirect`;
    console.log("redirect url: " + redirect_url);

    const twitter_authenticated = localStorage.getItem("twitter-authenticated")
    console.log(twitter_authenticated)

    if (twitter_authenticated) {
        location.href = `${redirect_url}?twitter-authenticated=true`
    }
    else {
        location.href = `https://twitter.com/i/oauth2/authorize?response_type=code&client_id=${SECRETS.OAUTH2_CLIENT_ID}&redirect_uri=${redirect_url}&scope=tweet.read%20tweet.write%20users.read%20offline.access&state=state&code_challenge=challenge&code_challenge_method=plain`
    }

})