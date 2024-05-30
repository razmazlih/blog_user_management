const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Add your routes here
// For example, for users and messages routes

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
