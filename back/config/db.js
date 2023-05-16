const mysql = require('mysql2')
const dotenv = require('dotenv')
dotenv.config()

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT
})

module.exports = db