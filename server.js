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

app.get('/join', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', 'student.html'));
});


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

const signUpUser = require('./routes/signUpUser')
app.use('/signUpUser', signUpUser);

const saveTest = require('./routes/saveTest')
app.use('/saveTest', saveTest);

const getUserTests = require('./routes/getUserTests')
app.use('/getUserTests', getUserTests);

const startTestSession = require('./routes/startTestSession')
app.use('/startTestSession', startTestSession);

const joinUserToSession = require('./routes/joinUserToSession')
app.use('/joinUserToSession', joinUserToSession);

const saveAnswers = require('./routes/saveAnswers')
app.use('/saveAnswers', saveAnswers);