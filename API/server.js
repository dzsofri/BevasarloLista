require('dotenv').config();
const express = require('express');
var mysql = require('mysql');
const app = express();
const port = process.env.PORT;

var pool  = mysql.createPool({
    connectionLimit : 10,
    host            : process.env.DBHOST,
    user            : process.env.DBUSER,
    password        : process.env.DBPASS,
    database        : process.env.DBNAME
});

// MIDDLEWARES 
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get('/', function (req, res) {
  res.send('Beréti Zsófia - BevásárlóList ');
});



// mock_data
// GET all item
app.get('/mock_data', (req, res)=>{
    pool.query(`SELECT * FROM mock_data`, (error, results) => {
        if (error) res.status(500).send(error);
        res.status(200).send(results);
    });
});

// GET one item by PK
app.get('/mock_data/:pk', (req, res)=>{
    let pk = req.params.pk;
    pool.query(`SELECT * FROM mock_data WHERE ID=?`, pk, (error, results) => {
        if (error) res.status(500).send(error);
        res.status(200).send(results);
    });
});

// POST new item
app.post('/mock_data', (req, res)=>{
    let data = req.body;
    pool.query(`INSERT INTO mock_data VALUES(null, '${data.category}', '${data.productname}', '${data.price}'})`, (error, results) => {
        if (error) res.status(500).send(error);
        res.status(200).send(results);
    });
});

// PATCH one item by PK
app.patch('/mock_data/:pk', (req, res)=>{
    let pk = req.params.pk;
    let data = req.body;
    pool.query(`UPDATE mock_data SET category='${data.category}', productname='${data.productname}', price='${data.price}' WHERE ID=?`, pk, (error, results) => {
        if (error) res.status(500).send(error);
        res.status(200).send(results);
    });
});

// DELETE one item by PK
app.delete('/mock_data/:pk', (req, res)=>{
    let pk = req.params.pk;
    pool.query(`DELETE FROM mock_data WHERE ID=?`, pk, (error, results) => {
        if (error) res.status(500).send(error);
        res.status(200).send(results);
    });
});








// bevasarlolista
// GET all item
app.get('/list', (req, res)=>{
    pool.query(`SELECT * FROM list`, (error, results) => {
        if (error) res.status(500).send(error);
        res.status(200).send(results);
    });
});

// GET one item by PK
app.get('/list/:pk', (req, res)=>{
    let pk = req.params.pk;
    pool.query(`SELECT * FROM list WHERE ID=?`, pk, (error, results) => {
        if (error) res.status(500).send(error);
        res.status(200).send(results);
    });
});

// POST new item
app.post('/list', (req, res)=>{
    let data = req.body;
    pool.query(`INSERT INTO list VALUES(null, '${data.kategoria}', '${data.termeknev}', '${data.ar}'})`, (error, results) => {
        if (error) res.status(500).send(error);
        res.status(200).send(results);
    });
});

// PATCH one item by PK
app.patch('/list/:pk', (req, res)=>{
    let pk = req.params.pk;
    let data = req.body;
    pool.query(`UPDATE list SET category='${data.category}', productname='${data.productname}, amount='${data.amount}', unitprice='${data.unitprice}, price='${data.price}' WHERE ID=?`, pk, (error, results) => {
        if (error) res.status(500).send(error);
        res.status(200).send(results);
    });
});

// DELETE one item by PK
app.delete('/list/:pk', (req, res)=>{
    let pk = req.params.pk;
    pool.query(`DELETE FROM list WHERE ID=?`, pk, (error, results) => {
        if (error) res.status(500).send(error);
        res.status(200).send(results);
    });
});







app.listen(port, ()=>{
    console.log(`Server listening on port: ${port}...`);
});