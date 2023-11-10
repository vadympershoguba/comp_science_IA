const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('questions');

router.post('/', async (req, res, next) => {
    data = req.body;
    console.log(data.test.questions)
    res.json({})
});

module.exports = router;