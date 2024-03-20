let token = localStorage.getItem("spToken");
console.log(token);

if(token) {
    location.href = "spMain.html"
}

async function login() {
    let spPhoneNum = document.getElementById("phone-number").value;
    let spPassword = document.getElementById("password").value;

    localStorage.setItem("spPhoneNum", spPhoneNum);
    localStorage.setItem("spPassword", spPassword);
    console.log(
        localStorage.getItem("spPhoneNum"),
        " ",
        localStorage.getItem("spPassword")
    );
  
    let url = "http://127.0.0.1:3000/user/sp/login";
    //let url = "https://csci430-node-server.azurewebsites.net/user/sp/login"
  
    let data = {
      phone_number: spPhoneNum,
      password: spPassword,
    };
  
    let options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
  
    let response = await fetch(url, options);
  
    if (response.status === 200) {
      console.log("logged in successfully.");
      const body = await response.json();
      console.log(body);
      console.log(JSON.stringify(body.user));
  
      localStorage.setItem("spUser", body.user);
      localStorage.setItem("spToken", body.token);
      localStorage.setItem("spUserID", body.user._id);
  
      location.href = "spMain.html";
    }
    else {
      console.log("error logging in");
    }
  }