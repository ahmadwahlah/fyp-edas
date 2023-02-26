const dotenv = require('dotenv');
const {createPool} = require('mysql');

const pool = createPool({
    host:'edas-admin.csujcs5csopi.ap-south-1.rds.amazonaws.com',
    user:'admin',
    port:3306,
    password:'pelikan1',
    database:'dbMysqlEdasAdmin',
    connectionLimit:10
})

module.exports = pool; 
