const token = localStorage.getItem("token");

if(token === null) {
    location.href = "index.html";
}

console.log("token: " + token)

console.log(localStorage.getItem('instagramPassword'));
console.log(localStorage.getItem('instagramUsername'));

function clearLocalStorage() {
    localStorage.removeItem('token');
    console.log(localStorage.getItem('token'));
}

async function logout() {
    const url = "https://csci430-node-server.azurewebsites.net/user/logout"
    //const url = "http://127.0.0.1:3000/user/logout"

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
        localStorage.removeItem("token");
        localStorage.removeItem("lastQuery");
        location.href = "index.html";
    }
    else {
        console.log("Error logging out");
    }
}