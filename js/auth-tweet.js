import * as SECRETS  from "./twitter-secrets.js"
console.log(SECRETS)

console.log('twitter_authenticated: ' + localStorage.getItem('twitter-authenticated'))

document.querySelector("#tweetButton").addEventListener("click", async () => {

    const text = document.querySelector("#tweetText").value || "Hello from n0code! Posted via API server!"
    localStorage.setItem("tweet-text", text)

    const redirect_url = `https://n0code.net/work/teaching/courses/csci430/studybuddy/twitter-redirect.html`
    
    const twitter_authenticated = localStorage.getItem("twitter-authenticated")
    console.log(twitter_authenticated)

    if (twitter_authenticated) {
        location.href = `${redirect_url}?twitter-authenticated=true`
    }
    else {
        location.href = `https://twitter.com/i/oauth2/authorize?response_type=code&client_id=${SECRETS.OAUTH2_CLIENT_ID}&redirect_uri=${redirect_url}&scope=tweet.read%20tweet.write%20users.read%20offline.access&state=state&code_challenge=challenge&code_challenge_method=plain`
    }

})