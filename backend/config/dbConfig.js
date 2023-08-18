const mysql = require('mysql2');
console.log('dbUser:', process.env.dbUser, 'dbPassword:', process.env.dbPassword, 'dbName:', process.env.dbName);
require('dotenv').config()
const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: process.env.dbUser,
    password: process.env.dbPassword,
    database: process.env.dbName,
});

pool.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to Db:', err);
        return;
    }
    console.log('Connection established');

    // Release the connection back to the pool
    connection.release();
});

const promisePool = pool.promise();

module.exports = promisePool;
