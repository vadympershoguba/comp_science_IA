const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('questions');

router.post('/', async (req, res, next) => {
    const session_id = req.body.code;
    const test_id = Array.from(await findTestId(session_id))[0].test_id;
    const test = await findTest(test_id)
    console.log(test)
    res.json({test: test})
});

async function findTestId(session_id) {
    return new Promise((resolve, reject) => {
        db.all(`select test_id from session where session_id = ?`, [+session_id], function (err, rows) {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

async function findTest(test_id) {
    return new Promise((resolve, reject) => {
        db.all(`SELECT question_id, question, type, options, answer FROM questions WHERE test_id = ?`,[test_id] , function (err, rows) {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

module.exports = router;