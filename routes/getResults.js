const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('questions');

router.post('/', async (req, res, next) => {
    const info = req.body
    const results = await getResults(info);
    console.log(results)
    let responce = 'Your score is - ' + `${results[0].points}` + ', your feedback is - ' + `${results[0].feedback}`
    res.json({data: responce})
});

async function getResults(info) {
    return new Promise((resolve, reject) => {
        db.all(`SELECT points, feedback FROM results WHERE session_id = ?`,[info.session_id] , function (err, rows) {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

module.exports = router;