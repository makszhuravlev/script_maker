const mysql = require("mysql2");
const connection = mysql.createConnection({
    host: '83.217.215.171',
    port:3306,
    user: 'monty',
  database: "scripts",
  password: "Alex2024@"
});

connection.connect((error) => {
    if(error){
        console.log('database connection fail');
    }
});

module.exports = connection;





 
