let allUsers;

const url = "http://localhost:3000/";

fetch(url + 'users')
    .then(response => response.json())
    .then(data => {
        allUsers = data;
    })

function login() {
    const myUsername = document.getElementById("login-username").value;
    const myPassword = document.getElementById("login-password").value;
    let myinfo = {
        username: myUsername,
        password: myPassword
    };

    let userFound = false;
    for (let i = 0; i < allUsers.length; i++) {
        const user = allUsers[i];
        const userUsername = user.username;
        const userPassword = user.password;
        if (userUsername === myUsername && userPassword === myPassword) {
            localStorage.setItem("Username", JSON.stringify(myinfo));
            window.location.href = "./blog.html";
            userFound = true;
            break;
        }
    }

    if (!userFound) {
        alert("User not Found!");
    }
}


function signUp() {
    const myEmail = document.getElementById("sign-up-email").value;
    const myUsername = document.getElementById("sign-up-username").value;
    const myPassword = document.getElementById("sign-up-password").value;
    let myNewInfo = {
        email: myEmail,
        username: myUsername,
        password: myPassword
    }
    fetch(url + 'users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(myNewInfo)
    })
    window.location.href = "./index.html"
    alert("Successful!")
}