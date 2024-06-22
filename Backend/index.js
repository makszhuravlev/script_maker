const express = require('express');
const connection = require('./dbconfig');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors()); // Use the CORS middleware

app.get('/getall', (req, res) => {
    connection.query('SELECT * FROM scripts_json', (error, result) => {
        if (error) {
            res.send('error to fetch student all records'); 
        } else {
            res.send(result);
            console.log("Send OK getall")
        }
    });
});

app.post('/create', (req, res) => {
    const data = req.body;
    connection.query('INSERT INTO scripts.scripts_json SET ?', data, (error, result, fields) => {
        if (error) throw error;
        res.send(result);
        console.log("Insert OK create")
    });
});

app.post('/update', (req, res) => {
    const data = req.body;
    connection.query('UPDATE `scripts`.`scripts_json` SET `json` = ? WHERE (`id` = ?);',[data.json, data.id], (error, result, fields) => {
        if (error) throw error;
        res.send(result);
        console.log("Update OK update")
    });
});

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
