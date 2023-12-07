const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const connectDB = require('./config/db.js');
const multer = require('multer');
const config = require('config');
const cors = require('cors');

// use cors middleware to allow cross-origin resource sharing
app.use(cors());
app.use(cors({
  origin: ['http://localhost:3000', 'https://edasgiki.surge.sh','https://edas.netlify.app'], // Replace with your client-side origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-auth-token']
}));


// use body-parser middleware to parse JSON data
app.use(bodyParser.json());
app.use(express.json({ extended: false }));

// SQL Database connection
require('./config/sqldatabase.js');
// MongoDB connection
connectDB();



//Defining Routes here
app.use('/api/admin',require('./routes/admin.js'))
app.use('/api/auth', require('./routes/auth.js'));
app.use('/api/dynamicforms', require('./routes/dynamicForms.js'));
app.use('/api/faculty', require('./routes/faculty.js'));
app.use('/api/forms', require('./routes/forms.js'));
app.use('/api/student', require('./routes/student.js'));


app.get('/', (req, res) => { res.json({message:'Hello World!'})})

const PORT = config.get('PORT') || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
