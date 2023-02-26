const express = require('express');
const dotenv = require('dotenv');
const app = express();


dotenv.config({path: './config.env'});
require("./database");
require('./router/auth');
const PORT =process.env.PORT || 8000;

app.use(express.json());
//link the router file 
app.use(require('./router/auth'));

app.listen(PORT, ()=>{
    console.log(`server is running on port number ${PORT}`);
})