const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('questions');

router.post('/', async (req, res, next) => {
    const session_id = req.body.session_id;
    const student_answers = await getAnswers(session_id)
    const test_id = await getTestId(session_id)
    const questions = await getCorrectAnswers(test_id[0].test_id)
    res.json({question_answers: questions, student_answers: student_answers})
});

async function getAnswers(session_id) {
    return new Promise((resolve, reject) => {
        db.all(`SELECT * FROM answers WHERE session_id = ?`,[`${session_id}`] , function (err, rows) {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

async function getTestId(session_id) {
    return new Promise((resolve, reject) => {
        db.all(`SELECT * FROM session WHERE session_id = ?`, [session_id], function (err, rows) {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

async function getCorrectAnswers(test_id) {
    return new Promise((resolve, reject) => {
        db.all(`SELECT * FROM questions WHERE test_id = ?`, [`${test_id}`], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

module.exports = router;

