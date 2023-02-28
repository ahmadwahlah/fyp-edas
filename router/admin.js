const express = require('express');
const router = express.Router();
const pool = require('../database');

// 1- Defining the API endpoint for Admin to check new requests from students
router.get('/api/admin/student/notapproved', (req, res) => {
    pool.query( `SELECT * FROM Student WHERE accept = false`, (error, results) => {
      if (error) throw error;
      // Send the response as JSON
      res.json(results);
    });
  });

// 2- Defining the API endpoint for Admin to check new requests from faculty
router.get('/api/admin/faculty/notapproved', (req, res) => {
    pool.query(`SELECT * FROM Faculty WHERE accept = false`, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
})

//--------------------------------------------------------------------------------
// 3- Defining the API endpoint for Admin to check approved from student
router.get('/api/admin/student/approved', (req, res) => {
    pool.query( `SELECT * FROM Student WHERE accept = true`, (error, results) => {
      if (error) throw error;
      // Send the response as JSON
      res.json(results);
    });
  });

// 4- Defining the API endpoint for Admin to check approved from faculty
router.get('/api/admin/faculty/approved', (req, res) => {
    pool.query(`SELECT * FROM Faculty WHERE accept = true`, (err, results) => {
        if (err) throw err;
        res.json({ message: results });
    });
})

//-------------------------------------------------------------------------
// 5- Defining the API endpoint for Admin to update the approval for student
router.put('/api/admin/student/:id', (req, res) => {
    const id = req.params.id;
    const query = `UPDATE Student SET accept = true WHERE id = ${id}`;
    
    pool.query(query, (error, results) => {
      if (error) throw error;
  
      // Send a success response
      res.json({ message: `Student with id ${id} has been approved.` });
    });
});
  

// 6- Defining the API endpoint for Admin to delete student
router.delete('/api/admin/student/:id', (req, res) => {
    const id = req.params.id;
    const query = `DELETE FROM Student WHERE id = ${id}`;
  
    pool.query(query, (error, results) => {
      if (error) throw error;
  
      // Send a success response
      res.json({ message: `Student with id ${id} has been deleted.` });
    });
});

//--------------------------------------------------------------------------
// 7- Defining the API endpoint for Admin to update the approval for Faculty
router.put('/api/admin/faculty/:id', (req, res) => {
    const id = req.params.id;
    const query = `UPDATE Faculty SET accept = true WHERE id = ${id}`;
  
    pool.query(query, (error, results, fields) => {
      if (error) throw error;
  
      // Send a success response
      res.json({ message: `Faculty with id ${id} has been approved.` });
    });
  });

// 8- Defining the API endpoint for Admin to delete Faculty
  router.delete('/api/admin/faculty/:id', (req, res) => {
    const id = req.params.id;
    const query = `DELETE FROM Faculty WHERE id = ${id}`;
  
    pool.query(query, (error, results, fields) => {
      if (error) throw error;
  
      // Send a success response
      res.json({ message: `Faculty with id ${id} has been deleted.` });
    });
  });

module.exports = router;