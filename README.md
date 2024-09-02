# Local Raspberry Pi Database
This repository contains a simple [express](https://www.npmjs.com/package/express) application designed to be used with [sqlite3](https://www.npmjs.com/package/sqlite3). Clone this repository (ideally to a Raspberry Pi), adjust the database tables and start the server. Inside of your local network you can post requests to the database with sql queries. Perfect for an IoT application!


***
# Getting Started with Node.js on Raspberry Pi
Update the raspberry pi

`sudo apt-get update`

`sudo apt-get upgrade`

Download version 19 (adjust to the newest node.js version)

`curl -fsSL https://deb.nodesource.com/setup_19.x | sudo -E bash -`

Install node.js

`sudo apt-get install -y nodejs`

Verify the node.js version

`node -v`

Install the node.js packages

`npm install express`

`npm install sqlite3`


***
# Code
First, choose a name for the database file. The following line should be replaced at both `server.js` and `db.js`:

`var db = new sqlite3.Database("mycustomdatabase.db");`

Now in the `db.js` file run sql queries to create your tables.
For example:
```js
db.run(
    `CREATE TABLE IF NOT EXISTS temp(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    timestamp TEXT NOT NULL DEFAULT current_timestamp,
    temperature FLOAT,
    humidity INTEGER);`
);
```

Perfect! Now you are ready to start the server. Get the ip address of the raspberry pi first:

`ip a`

With any other device that is connected to the same network, e.g. an ESP8266, you can create a post request to `raspberry pi ip adress:3000/api/request` with a sql query as a json object: `{ "query": "SELECT * FROM temp" }`.

Here is an example function for javascript embedded in html. Call `request("SELECT * FROM temp");` or any other query to post requests to the database.
```js
function request(query) {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "raspberry pi ip adress:3000/api/request/");
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
        
            console.log(xhr.responseText); // the servers responce { "status": "ok", "result": { ... } }

            let obj;
            try {
                obj = JSON.parse(xhr.responseText)['result'];
            } catch (e) {
                return console.log(e);
            }
        }
    };

    // create json object for request
    let data = `{
        "query": "` + query + `"
    }`;
    xhr.send(data);
}
```


***
# Credits
Local Raspberry Pi Database - A simple express, sqlite3 project for IoT applications.
Created by Konrad Wohlfahrt, September 02, 2024.
Released into the public domain.