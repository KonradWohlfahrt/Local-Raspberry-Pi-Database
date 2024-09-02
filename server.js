var express = require("express");
var bodyParser = require("body-parser");
var sqlite3 = require("sqlite3");
var database = require("./db.js");
var db = new sqlite3.Database("yourdatabase.db"); // change the db file name

const app = express();
app.listen(3000);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

console.log('server ready and listening on port 3000');

app.post('/api/request', (request, responce) => {
    var sql = request.body.query;
    if (!sql) {
        responce.status(400).send({ status: 'error', result: 'sql query is null' });
        return;
    }

    sql = sql.trim();    
    db.all(sql, (err, rows) => {
        if (err) {
            responce.status(400).send({ status: 'error', result: err.message });
            return;
        }
        responce.status(200).send({ status: 'ok', result: rows });
    });
});