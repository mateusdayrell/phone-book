const mysql = require('mysql');
require('dotenv').config()
// const express = require('express')
// const app = express()

const connectDB = (app) => {
    const con = mysql.createConnection({
        host: process.env.HOST, // Ex: localhost
        user: process.env.USER, // Ex: root 
        password: process.env.PASSWORD, // Ex: root123
        database: process.env.DATABASE, // Ex: test_mysql
    });
    
    con.connect((err) => {
        if (err) {
            console.log('Erro connecting to database...', err)
            return
        }
        console.log('Connection established!')
    })
    
    con.end((err) => {
        if(err) {
            console.log('Erro to finish connection...', err)
            return 
        }
        console.log('The connection was finish...')
        app.emit('connected')
    })
}

module.exports = {
    connectDB
}
