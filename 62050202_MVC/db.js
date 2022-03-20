const mysql = require('mysql');

//เชื่อมต่อฐานข้อมํูล mysql
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'assignment'
})
connection.connect((err) => {
    if(err){
        console.log(err);
    }else {
        console.log('Database Connected')
    }
})

module.exports = connection;