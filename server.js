const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('questions');

const app = express();
const port = 3000; 

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'pages')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

const checkUserInDB = require('./routes/checkUserInDB')
app.use('/checkUserInDB', checkUserInDB);

