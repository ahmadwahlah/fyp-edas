const express = require('express');
const router = express.Router();
const pool = require('../database');


router.get('/',(req,res)=> {
    pool.query(`SELECT * FROM Users`, (err,result,fields) => {
        if(err){
            console.log(err.message);
        }else {
            // res.send(result);
            res.send("Hello I am working");
        }
    });
})


router.post('/register',(req,res)=> {
    const { RegNo,FirstName,LastName,Role,Dept,Phone,Email,Password} = req.body;
    if (!RegNo || !FirstName || !LastName || !Role || !Dept || !Phone || !Email || !Password) {
        res.json({error: "Please fill the fields properly"});
    }
    const sql = `INSERT INTO Users ( RegNo, FirstName, LastName, Role, Dept, Phone, Email, Password ) VALUES (?,?,?,?,?,?,?,?);`;
    pool.query(sql,[RegNo,FirstName,LastName,
        Role,Dept,Phone,Email,Password],(err,result)=>{
            if (err) throw err;
                res.send("1 row insersted");
        });   
})

module.exports = router;