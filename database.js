const dotenv = require('dotenv');
const {createPool} = require('mysql');


// dotenv.config({path: './config.env'});
const pool = createPool({
    host:'edas-admin.csujcs5csopi.ap-south-1.rds.amazonaws.com',
    user:'admin',
    port:3306,
    password:'pelikan1',
    database:'dbMysqlEdasAdmin',
    connectionLimit:10
})


// pool.query(`SELECT * FROM Users`, (err, results, fields) => {
//     if (!err) {
//         console.log(results);
//     }else{
//         console.log(err.message);
//     }
// })

module.exports = pool; 
