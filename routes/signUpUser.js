const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('questions');

router.post('/', async (req, res, next) => {
    data = req.body;
    const usernames = await getUsernames();
    for (let i = 0; i < usernames.length; i++) {
        if (usernames[i].username == data.username){
            res.json({message: 'Username is already used'})
        }
    }
    await addUser(data.username, data.password)
    res.json({message: "You have successfully signed up!"})
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

async function addUser(username, password) {
    return new Promise((resolve, reject) => {
        db.run('insert into users (user_id, username, password) values (?, ?, ?)', ['1', username, password], function (err) {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

module.exports = router;