const express = require('express');
const router = express.Router();
const pool = require('../database');


// Defining a GET API to retrieve student data by id
router.get('/api/student/:id', (req, res) => {
    const id = req.params.id;
    const query = `SELECT * FROM Student WHERE id = ${id}`;
  
    // Execute the query using the MySQL pool
    pool.query(query, (error, results, fields) => {
      if (error) throw error;
  
      // Send the results as a JSON response
      res.json(results);
    });
  });


module.exports = router;