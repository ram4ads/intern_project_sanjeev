

const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 7000;

app.use(bodyParser.json());
app.use(cors()); // add cors middleware

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root133',
    database: 'client_actions'
});

connection.connect(function(err){
    if(err) throw err;
    console.log('Connected to database');
});

app.post('/actions', (req, res) => {
    const { user, created_At } = req.body;
    const query = `INSERT INTO actions (user, created_At) VALUES ('${user}', '${created_At}')`;

    connection.query(query, (error, results) => {
        if(error) throw error;
        res.send(`Action added with ID: ${results.insertId}`);
    });
});

app.get('/view',(req,res)=>{
//     const query =`SELECT 
//     DATE_FORMAT(created_At, '%H') AS hour, 
//     COUNT(*) as count 
//   FROM 
//     actions 
//   WHERE 
//     user IN ("user1","user2") 
    
//   GROUP BY 
//      hour`;
const query=`select user,count(*) as count from actions where user IN("user1","user2") group by user`
    connection.query(query,(error,results)=>{
        if(error) throw error;
        res.send(results)
    })
})

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
