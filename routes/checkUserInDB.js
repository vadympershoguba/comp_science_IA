const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('questions');

router.post('/', async (req, res, next) => {
    data = req.body;
    const usernames = await getUsernames();
    console.log(usernames)
});

async function getUsernames() {
    return new Promise((resolve, reject) => {
        db.all("select username from users", function (err, rows) {
            if (err) {
                reject(err);
            } else {
                 resolve(rows);
            }
        });
    });
}

module.exports = router;