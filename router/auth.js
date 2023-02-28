const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const pool = require('../database');
const { v4: uuidv4 } = require('uuid');


//===============================================TEST========================================================
// Defining the API endpoint for testing
router.get('/', (req, res) => {
    pool.query(`SELECT * FROM Users`, (err, results) => {
        if (err) throw err;
        res.json({ message: results });
    });
})

//=================================================ADMIN======================================================
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
            const payload ={
                email : user.email,
                password : user.password,
            };
            const options = {
                expiresIn: '1h', // token will expire in 1 hour
              };
            const token = jwt.sign(payload,`abdullahmohammad2019274`,options);
            res.json({
                message: 'Login successful',
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    accessToken: token
                }
            });
        }
    });
});

//=======================================================STUDENT====================================================
// Defining the API endpoint for signing up a new student
router.post('/api/student/signup', (req, res) => {
    const accept = false;
    const newUuid = uuidv4();
    const {firstname, lastname, email, password, phoneNumber, regnum, role, faculty, batch } = req.body;

    // Check if all required fields are provided
    if (!firstname || !lastname || !email || !password || !phoneNumber || !regnum || !role || !faculty || !batch) {
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
            pool.query('INSERT INTO Student (id, firstname, lastname, email, password, phoneNumber, regnum, role, faculty ,accept ,batch) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                [newUuid, firstname, lastname, email,hash, phoneNumber, regnum, role, faculty, accept, batch],
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
//----------------------------------------------------------------------------------------------------------
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
            const payload = {
                email: student.email,
                password:student.password
            }
            const options = {
                expiresIn: '1h',
            }

            const token = jwt.sign(payload,"abdullahmohammad2019274",this.options);
            bcrypt.compare(password, student.password, (error, match) => {
                if (error) {
                    console.error(error);
                    return res.status(500).json({ message: 'Internal server error' });
                }

                if (!match) {
                    return res.status(401).json({ message: 'Invalid email or password' });
                }

                // Passwords match, generate a JWT token and return it to the client
                return res.json({ token: token});
            });
        });
    });

    //====================================================FACULTY==========================================
    // Defining the API endpoint for signing up a Faculty
    router.post('/api/faculty/signup', (req, res) => {
        const {id ,firstname, lastname, email, password, phoneNumber, regnum, role, department } = req.body;
        const accept = false;

         // Check if all required fields are provided
        if (!id || !firstname || !lastname || !email || !password || !phoneNumber || !regnum || !role || !department) {
            return res.status(400).json({ message: 'All fields are required' });
        }
    
        // Check if the email address is already in use
        pool.query('SELECT * FROM Faculty WHERE email = ?', email, (error, results) => {
            if (error) {
                console.error(error);
                return res.status(500).json({ message: 'Internal server error +' });
            }
    
            if (results.length > 0) {
                return res.status(400).json({ message: 'Email address is already in use' });
            }
        })
    
        // Hash the password using bcrypt
        bcrypt.hash(password, 10, (error, hashedPassword) => {
            if (error) {
                console.error(error);
                res.status(500).send('Error hashing password');
            } else {
                // Insert the new user into the Faculty table
                const queryString = 'INSERT INTO Faculty (id, firstname, lastname, email, password, phoneNumber, regnum, role, department, accept) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
                const values = [id, firstname, lastname, email, hashedPassword, phoneNumber, regnum, role, department, accept];
    
                pool.query(queryString, values, (error, results) => {
                    if (error) {
                        console.error(error);
                        res.status(500).send('Error inserting new user into database');
                    } else {
                        res.status(200).send('User created successfully');
                    }
                });
            }
        });
    });
    
    // Defining the API endpoint for logini a Faculty
    router.post('/api/faculty/login', (req, res) => {
        const email = req.body.email;
        const password = req.body.password;
      
        pool.query('SELECT * FROM Faculty WHERE email = ?', [email], (error, results) => {
          if (error) {
            console.error('Error querying database:', error);
            res.status(500).send('Error querying database');
          } else if (results.length === 0) {
            res.status(401).send('Invalid email or password');
          } else {
            const hashedPassword = results[0].password;
            const faculty = result[0];
            const payload =  {
                email: faculty.email,
                password: faculty.password
            }
            const options = {
                expiresIn: '1h',
            }

            const token = jwt.sign(payload, "abdullahmohammad2019274", options);
      
            bcrypt.compare(password, hashedPassword, (bcryptError, bcryptResult) => {
              if (bcryptError) {
                console.error('Error comparing passwords:', bcryptError);
                res.status(500).send('Error comparing passwords');
              } else if (bcryptResult) {
                res.json({
                    message: "Login Sucessful",
                    token: token,
                });
              } else {
                res.status(401).send('Invalid email or password');
              }
            });
          }
        });
      });

    module.exports = router;