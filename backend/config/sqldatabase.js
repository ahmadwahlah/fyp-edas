// const {createPool} = require('mysql');
// const config = require('config');

// const host = config.get('host');
// const database = config.get('database');
// const password = config.get('password')

// const pool = createPool({
//     host: host,
//     user: 'admin',
//     port: 3306,
//     database: database,
//     password: password
// });

// pool.getConnection((err, connection) => {
//     if (err) {
//       console.log('Error connecting to database');
//       console.log(err);
//     } else {
//       console.log('Connected to sql database');
//       connection.release();
//     }
// });

// module.exports = pool;