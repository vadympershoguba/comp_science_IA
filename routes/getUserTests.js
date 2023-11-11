const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('questions');

router.post('/', async (req, res, next) => {
    username = req.body.username;
    const data = await getTestId(username);
    res.json({data: data})
});

async function getTestId(username) {
    return new Promise((resolve, reject) => {
        db.all(`SELECT test_name FROM user_tests WHERE username = ?`,[username] , function (err, rows) {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

module.exports = router;