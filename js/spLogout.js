const token = localStorage.getItem("spToken");

async function logout() {
    const url = "https://csci430-node-server.azurewebsites.net/user/sp/logout"
    //const url = "http://127.0.0.1:3000/user/sp/logout"

    const options = {
        method: "PATCH",
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    console.log(token);

    let response = await fetch(url, options)

    if(response.status === 200) {
        console.log("logout successful");
        localStorage.removeItem("spToken");
        localStorage.removeItem("twitter-authenticated");
        location.href = "spLogin.html";
    }
    else {
        console.log("Error logging out");
    }
}