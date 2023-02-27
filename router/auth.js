const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const pool = require('../database');

//// Defining the API endpoint for testing
router.get('/', (req, res) => {
    pool.query(`SELECT * FROM Users`, (err, results) => {
        if (err) throw err;
        res.json({ message: results });
    });
})

// Defining the API endpoint for login a Admin
router.post('/api/admin/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    pool.query('SELECT * FROM Admin WHERE email = ? AND password = ?', [email, password], (error, results) => {
        if (error) {
            res.status(500).json({ error: 'Internal server error' });
        } else if (results.length === 0) {
            res.status(401).json({ error: 'Invalid email or password' });
        } else {
            // Login successful
            const user = results[0];
            res.json({
                message: 'Login successful',
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.name
                }
            });
        }
    });
});

// Defining the API endpoint for signing up a new student
router.post('/api/student/signup', (req, res) => {
    const accept = false;
    const { id, firstname, lastname, email, password, phoneNumber, regnum, role, department } = req.body;

    // Check if all required fields are provided
    if (!id || !firstname || !lastname || !email || !password || !phoneNumber || !regnum || !role || !department) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if the email address is already in use
    pool.query('SELECT * FROM Student WHERE email = ?', email, (error, results) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error +' });
        }

        if (results.length > 0) {
            return res.status(400).json({ message: 'Email address is already in use' });
        }

        // Hash the password
        bcrypt.hash(password, 10, (err, hash) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Internal server error' });
            }

            // Insert the new student into the database
            pool.query('INSERT INTO Student (id, firstname, lastname, email, password, phoneNumber, regnum, role, department ,accept) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                [id, firstname, lastname, email,hash, phoneNumber, regnum, role, department, accept],
                (error, results) => {
                    if (error) {
                        console.error(error);
                        return res.status(500).json({ message: 'Internal server error *' });
                    }

                    return res.status(201).json({ message: 'Student created successfully' });
                });
             });
        });
    });

    // Defining the API endpoint for loging a student
    router.post('/api/student/login', (req, res) => {
        const { email, password } = req.body;

        // Check if email and password are provided
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        // Find the student in the database by email address
        pool.query('SELECT * FROM Student WHERE email = ?', email, (error, results) => {
            if (error) {
                console.error(error);
                return res.status(500).json({ message: 'Internal server error' });
            }

            if (results.length === 0) {
                return res.status(401).json({ message: 'Invalid email or password' });
            }

            // Compare the password hash
            const student = results[0];
            bcrypt.compare(password, student.password, (error, match) => {
                if (error) {
                    console.error(error);
                    return res.status(500).json({ message: 'Internal server error' });
                }

                if (!match) {
                    return res.status(401).json({ message: 'Invalid email or password' });
                }

                // Passwords match, generate a JWT token and return it to the client
                // const token = generateToken(student.id);
                return res.json({ token: "Valid"});
            });
        });
    });

    // router.post('/register',(req,res)=> {
    //     const { RegNo,FirstName,LastName,Role,Dept,Phone,Email,Password} = req.body;
    //     if (!RegNo || !FirstName || !LastName || !Role || !Dept || !Phone || !Email || !Password) {
    //         res.json({error: "Please fill the fields properly"});
    //     }
    //     const sql = `INSERT INTO Users ( RegNo, FirstName, LastName, Role, Dept, Phone, Email, Password ) VALUES (?,?,?,?,?,?,?,?);`;
    //     pool.query(sql,[RegNo,FirstName,LastName,
    //         Role,Dept,Phone,Email,Password],(err,result)=>{
    //             if (err) throw err;
    //                 res.send("1 row insersted");
    //         });   
    // })

    module.exports = router;