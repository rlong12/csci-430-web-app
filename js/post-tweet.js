import * as SECRETS from "./twitter-secrets.js"
console.log(SECRETS)

const token = localStorage.getItem("token");
console.log("sb token: " + token)

const sleepNow = (delay) => new Promise((resolve) => setTimeout(resolve, delay * 1000))

console.log(document.location)
const params = (new URL(document.location)).searchParams;
console.log(params)

// Either user autheticated previously in app
const twitter_authenticated = params.get('twitter-authenticated')
console.log('twitter-authenticated: ' + twitter_authenticated)

// OR X sent auth code
const auth_code = params.get("code")
console.log('auth code: ' + auth_code)

if (twitter_authenticated || auth_code) {
    console.log("user authenticated with twitter!")

    const text = localStorage.getItem("tweet-text") || "Hello from n0code!"
    console.log(text)

    console.log('calling postTweet()')

    await postTweet(text)
}
else {
    console.log('Error - URL should contains twitter-authenticated || auth code')
}

async function postTweet(text) {
    console.log('inside postTweet()')

    console.log("studybuddy token: " + token)

    const h1 = document.querySelector("h1")
    const p = document.querySelector("p")

    if (!token) {
        p.innerHTML = "User must be logged into the Study Buddy app!"
        return
    }

    //const url = "https://studybuddy-api-server.azurewebsites.net/twitter/send-tweet"
    let url = "http://127.0.0.1:3000/twitter/send-tweet";
    //let url = "https://csci430-node-server.azurewebsites.net/twitter/send-tweet";
    console.log(url)
    
    console.log(twitter_authenticated)
    console.log(auth_code)
    console.log(text)

    const data = (auth_code) ? { auth_code, text } : { text }
    console.log(data)

    const body = JSON.stringify(data)
    console.log(body)

    const options = {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": 'application/json'
        },
        body
    }

    console.log('calling fetch')

    let response = await fetch(url, options)

    console.log(response)

    console.log('fetch returned')

    if (response.status === 201) {
        localStorage.setItem("twitter-authenticated", true)

        console.log("Log into X and view the posts you've made.")

        h1.innerHTML = "Log into X"
        p.innerHTML = "and view your tweet."

        console.log('done')

        await sleepNow(3)
        location.href = "tweet-form.html"
    }
    else {
        console.log('failed to send tweet')

        h1.innerHTML = "Failed to send tweet."
        p.innerHTML = "Redirecting back."

        await sleepNow(3)

        location.href = "tweet-form.html"
    }
}