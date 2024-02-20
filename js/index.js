let token = localStorage.getItem("token");
console.log(token);

if(token) {
    location.href = "main.html"
}