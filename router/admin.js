const express = require('express');
const router = express.Router();
const pool = require('../database');


router.get('/api/admin/student/notapproved', (req, res) => {
    pool.query( `SELECT * FROM Student WHERE accept = false`, (error, results) => {
      if (error) throw error;
      // Send the response as JSON
      res.json(results);
    });
  });

  router.get('/api/admin/faculty/notapproved', (req, res) => {
    pool.query(`SELECT * FROM Faculty WHERE accept = false`, (err, results) => {
        if (err) throw err;
        res.json({ message: results });
    });
})

module.exports = router;