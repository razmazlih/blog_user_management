let allUsers;
let allMessages;

const url = "http://localhost:3000/";

async function getUsers() {
    try {
        const response = await fetch(url + 'users');
        allUsers = await response.json();
    } catch (error) {
        console.error('Error fetching users:', error);
    }
}

async function getMessages() {
    try {
        const response = await fetch(url + 'messages');
        allMessages = await response.json();
    } catch (error) {
        console.error('Error fetching messages:', error);
    }
}

async function login() {
    await getUsers();
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
            localStorage.setItem("usernameKey", JSON.stringify(myinfo));
            window.location.href = "./blog.html";
            userFound = true;
            break;
        }
    }

    if (!userFound) {
        alert("User not Found!");
    }
}

async function signUp() {
    const myEmail = document.getElementById("sign-up-email").value;
    const myUsername = document.getElementById("sign-up-username").value;
    const myPassword = document.getElementById("sign-up-password").value;
    let myNewInfo = {
        email: myEmail,
        username: myUsername,
        password: myPassword
    };
    try {
        const response = await fetch(url + 'users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(myNewInfo)
        });
        if (response.ok) {
            window.location.href = "./index.html";
            alert("Successful!");
        } else {
            alert("Error: Unable to sign up!");
        }
    } catch (error) {
        console.error('Error signing up:', error);
        alert("Error: Unable to sign up!");
    }
}

async function showMessages() {
    let textBlog = document.getElementById("text-blog");
    try {
        const response = await fetch(url + 'messages');
        const messages = await response.json();
        textBlog.innerHTML = messages;
    } catch (error) {
        console.error('Error fetching messages:', error);
    }
    if (textBlog.innerHTML == "") {
        textBlog.innerHTML = "No Messages Yet"
    }
}

function sendMessage() {
    const myUsername = JSON.parse(localStorage.getItem("usernameKey"))["username"];
    const myMessage = document.getElementById("message-input").value;
    let newMessage = {
        username: myUsername,
        content: myMessage
    };
    try {
        fetch(url + 'messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newMessage)
        }).then(response => {
            if (response.ok) {
                showMessages();
            } else {
                alert("Error: Unable to send message!");
            }
        });
    } catch (error) {
        console.error('Error sending message:', error);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    if (window.location.pathname.endsWith('blog.html')) {
        showMessages();
    }
});
