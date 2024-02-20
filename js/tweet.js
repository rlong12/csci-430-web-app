import * as SECRETS  from "./twitter-secrets.js"
console.log(SECRETS)

const sleepNow = (delay) => new Promise((resolve) => setTimeout(resolve, delay * 1000))

document.querySelector("#tweetButton").addEventListener("click", authTweet);

// get potential token from query string
const params = (new URL(document.location)).searchParams;
console.log(params)
const auth_code = params.get("code")
console.log('auth code: ' + auth_code)

if (auth_code) {
    console.log("user authenticated!")
    console.log(auth_code)
    
    const text = localStorage.getItem("tweet-text") || "Hello from n0code!"
    console.log(text)

    console.log('calling postTweet()')
    
    await postTweet(text)
}

async function authTweet() {

    const text = document.querySelector("#tweetText").value || "Hello from n0code! Posted via API server!"
    localStorage.setItem("tweet-text", text);

    const encoded = `https://n0code.net/work/teaching/courses/csci430/studybuddy/tweet.html`
    const authURL = `https://twitter.com/i/oauth2/authorize?response_type=code&client_id=${SECRETS.OAUTH2_CLIENT_ID}&redirect_uri=${encoded}&scope=tweet.read%20tweet.write%20users.read&state=state&code_challenge=challenge&code_challenge_method=plain`

    console.log(authURL)

    location.href = authURL
}


async function postTweet(text) {
    console.log('inside postTweet()')

    const url = "https://studybuddy-api-server.azurewebsites.net/twitter/send-tweet"
    console.log(url)

    console.log(SECRETS.OAUTH2_CLIENT_ID)
    console.log(text)

    const data = {
        text,
        OAUTH2_CLIENT_ID: SECRETS.OAUTH2_CLIENT_ID,
        auth_code
    }
    console.log(data)

    const body = JSON.stringify(data)
    console.log(body)

    const options = {
        method: "POST",
        headers: {
            "Content-Type": 'application/json'
        },
        body
    }

    console.log('calling fetch')

    let response = await fetch(url, options)

    console.log(response)

    console.log('fetch returned')

    if (response.status === 201) {
        console.log("log into X and view the posts you've made.")

        const h1 = document.querySelector("h1")
        const p = document.querySelector("p")

        h1.innerHTML = "Log into X"
        p.innerHTML = "and view the posts you've made."

        console.log('done')

        await sleepNow(3)

        location.href = "tweet.html"
    }
    else {
        console.log('failed to send tweet')
    }
}