const token = localStorage.getItem("token");

console.log("token: " + token)

async function logout() {
    //const url = "https://csci430-node-server.azurewebsites.net/user/logout"
    const url = "http://127.0.0.1:3000/user/logout"

    const options = {
        method: "PATCH",
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    let response = await fetch(url, options)

    if(response.status === 200) {
        localStorage.removeItem("token");
        location.href = "index.html";
    }
}