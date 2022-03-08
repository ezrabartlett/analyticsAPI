const app = require('express')();

const { Pool, Client } = require("pg");

/*const client = new Client({
  user: "pvigrpjtxqtcnn",
  host: "ec2-52-23-40-80.compute-1.amazonaws.com",
  database: "dbaiv4n81imle6",
  password: "f98df04845897fc6b7bdc9d7582e9e9a2001435ee593da0529aa764e26a650ef",
  port: "5432"
});*/

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

//client.connect();

const logVisit = async (visitNum) => {
    try {
        await client.connect();           // gets connection
        await client.query(
            `INSERT INTO "visits" ("visit")  
             VALUES ($1)`, [visitNum]); // sends queries
        return true;
    } catch (error) {
        console.error(error.stack);
        return false;
    } finally {
        await client.end();               // closes connection
    }
};

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
    console.log("inserting a visit");
    logVisit(25).then(result => {
        if (result) {
            res.status(200).send({
                response: "created table"
            });
        }
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