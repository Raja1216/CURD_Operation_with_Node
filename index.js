const express = require('express');
const app = express();
const mysql =require('mysql');
const cors = require('cors')

app.use(cors());
app.use(express.json());

const DB = mysql.createConnection({
    user:'root',
    host:'localhost',
    password:'',
    database:'employee_system',
});

//Route Create and store variable value get from frontend
app.post('/create',(req,res) =>{
    const fname =req.body.fname;
    const lname =req.body.lname;
    const age =req.body.age;
    const country =req.body.country;
    const position =req.body.position;
//Insert Data into DataBase
    DB.query('INSERT INTO employees (FirstName,LastName,Age,Country,Position) VALUES(?,?,?,?,?)',
    [fname,lname,age,country,position], 
    (err, result) => {
     if (err) {
         console.log(err);
     }
     else{
         res.send("Inserted Successfully");
     }
    });
})


app.get('/getEmp', (req,res) => {
DB.query('SELECT * FROM employees', (err,result) =>{
    if (err) {
        console.log(err);
    }
    else{
        res.send(result);
    }
});
});


app.listen(3001, ()=> {
    console.log("Server is running");
})