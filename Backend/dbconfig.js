const mysql = require("mysql2");
const connection = mysql.createConnection({
    host: '88.84.211.248',
    port:3306,
    user: 'Admin',
  database: "scripts",
  password: "Lanta"
});

connection.connect((error) => {
    if(error){
        console.log('database connection fail');
    }
});

module.exports = connection;





 