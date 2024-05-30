const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));

// Routes for handling users
app.get('/users', (req, res) => {
    fs.readFile(path.join(__dirname, 'db.json'), (err, data) => {
        if (err) {
            res.status(500).send('Error reading user data');
        } else {
            const db = JSON.parse(data);
            res.json(db.users);
        }
    });
});

app.post('/users', (req, res) => {
    const newUser = req.body;
    fs.readFile(path.join(__dirname, 'db.json'), (err, data) => {
        if (err) {
            res.status(500).send('Error reading user data');
        } else {
            const db = JSON.parse(data);
            db.users.push(newUser);
            fs.writeFile(path.join(__dirname, 'db.json'), JSON.stringify(db), err => {
                if (err) {
                    res.status(500).send('Error saving user data');
                } else {
                    res.status(201).send('User added successfully');
                }
            });
        }
    });
});

// Routes for handling messages
app.get('/messages', (req, res) => {
    fs.readFile(path.join(__dirname, 'db.json'), (err, data) => {
        if (err) {
            res.status(500).send('Error reading messages');
        } else {
            const db = JSON.parse(data);
            res.json(db.messages);
        }
    });
});

app.post('/messages', (req, res) => {
    const newMessage = req.body;
    fs.readFile(path.join(__dirname, 'db.json'), (err, data) => {
        if (err) {
            res.status(500).send('Error reading messages');
        } else {
            const db = JSON.parse(data);
            db.messages.push(newMessage);
            fs.writeFile(path.join(__dirname, 'db.json'), JSON.stringify(db), err => {
                if (err) {
                    res.status(500).send('Error saving message');
                } else {
                    res.status(201).send('Message added successfully');
                }
            });
        }
    });
});

// Serve HTML files
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
