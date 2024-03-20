let spToken = localStorage.getItem("spToken");
console.log(spToken);

function removeToken() {
    localStorage.removeItem("spToken");
    console.log(localStorage.getItem("spToken"))
}