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


router.post('/api/student/form/hierarchy/:id', (req, res) => {
    const idi = req.body.id;
    const pending = req.body.pending;
    const approved = req.body.approved;
    const disapproved = req.body.disapproved;
    const passToNext = req.body.passToNext;

    const query = `SELECT * FROM Form JOIN Hierarchy ON Form.id = Hierarchy.form_id;`;
  
    // Execute the query using the MySQL pool
    pool.query(query, (error, results) => {
      if (error) throw error;
  
      // Extract the relevant row from the results array
      const row = results[0];
  
      // Extract the column values from the row
      const { id, formtype, formInitiator, form_id, hierarchy } = row;
  
      const insertQuery = `INSERT INTO Form_Progress ( progress_id , progress) VALUES (${form_id},JSON_OBJECT(
          ${hierarchy[0]}:JSON_OBJECT('id':${idi}, isPending:${pending}, isApproved:${approved}, isDisapproved:${disapproved}, passToNext:${passToNext})
          ))`;
  
    pool.query(insertQuery, (error, results, fields) => {
        if (error) throw error;
  
        // Send the results as a JSON response
        res.json({message: "DATA SAVE SUCESSFULLY"});
      });
    });
 });

//   router.post(`/api/student/form/hierarchy/:id`,(req,res) => {
//     const query = `INSERT INTO Form_Progress ( progress_id , progress) VALUES (?,JSON_OBJECT(
//         0:JSON_OBJECT('id':?, isPending:?, isApproved:?, isDisapproved:? ,passToNext: ?),
//         1:JSON_OBJECT('id':?, isPending:?, isApproved:?, isDisapproved:? ,passToNext: ?),
//         2:JSON_OBJECT('id':?, isPending:?, isApproved:?, isDisapproved:? ,passToNext: ?)
//         ))`;
  
//         pool.query(query, (error, results, fields) => {
//             if (error) throw error;
        
//             // Send the results as a JSON response
//             res.json(results);
//         });

// })


module.exports = router;