const app = require('express')();

const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect();

client.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
  if (err) throw err;
  for (let row of res.rows) {
    console.log(JSON.stringify(row));
  }
  client.end();
});

const PORT = process.env.PORT || 8080;

app.listen(
    PORT,
    () => console.log('API listening')
);

app.get('/siteVisit', (req, res) => {
    console.log("Site visited");
    res.status(200).send({
        response: "Visit logged"
    });
});

app.get('/resumeDownload', (req, res) => {
    console.log("Site visited");
    res.status(200).send({
        response: "Resume Download logged"
    });
});

app.get('/testVisit', (req, res) => {
    console.log("creating table");
    client.query("INSERT INTO Visits(visit)VALUES(5)", (err, res) => {
      if (err) throw err;
      for (let row of res.rows) {
        console.log(JSON.stringify(row));
      }
      client.end();
    });
    res.status(200).send({
        response: "created table"
    });
});

app.get('/systemGenerated/:seed', (req, res) => {
    console.log("Site visited");
    const {seed} = req.params;
    if (!seed) {
        res.status(418).send({
            message:"No seed sent"
        })
    } 
    res.status(200).send({
        response: `System Generated with seed ${seed}`
    });
});