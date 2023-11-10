const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('questions');

router.post('/', async (req, res, next) => {
    data = req.body;
    const testID = generateID()
    await saveTestDB(data, testID)
    res.json({})
});

async function saveTestDB(data, test_id) {
    return new Promise((resolve, reject) => {
        db.run('insert into user_tests(test_id, username, test_name, test_complexity, test_topic) values (?, ?, ?, ?, ?)', [`${test_id}`, data.username, data.test.name, data.test.complexity, data.test.topic], function (err) {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

function generateID(){
    return Math.floor(Math.random() * (10000000000 - 1 + 1)) + 1;
}

module.exports = router;