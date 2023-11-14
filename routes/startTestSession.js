const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('questions');

router.post('/', async (req, res, next) => {
    username = req.body.username;
    testName = req.body.testName;
    const test_id = await getTestId(username, testName);
    const session_id = generateID()
    await createCode(username, test_id[0].test_id, session_id)
    res.json({session_id: session_id})
});

function generateID(){
    return Math.floor(Math.random() * (999999 - 100001 + 1)) + 1;
}

async function createCode(username, test_id, session_id) {
    return new Promise((resolve, reject) => {
        db.all(`INSERT INTO session(user_id, test_id, session_id, status) VALUES(?, ?, ?, ?)`, [username, test_id, session_id, 'STARTED'], function (err, rows) {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

async function getTestId(username, testName) {
    return new Promise((resolve, reject) => {
        db.all(`SELECT test_id FROM user_tests WHERE test_name = ? and username = ?`,[testName, username] , function (err, rows) {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

module.exports = router;