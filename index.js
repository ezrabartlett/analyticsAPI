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

client.connect();

const getDateTime = () => {
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;
    return dateTime;
}

const logVisit = async () => {
    var date = getDateTime();
    try {         // gets connection
        await client.query("INSERT INTO sitevisits(date)VALUES('"+date+"')",
            (err, res) => {
                console.log(err, res);
            }
        );
        return true;
    } catch (error) {
        console.error(error.stack);
        return false;
    }
};

const logSystemGenerated = async (coordinates) => {
    var date = getDateTime();
    try {         // gets connection
        await client.query("INSERT INTO systemsGenerated(date, coordinates)VALUES('"+date+"', '"+coordinates+"')",
            (err, res) => {
                console.log(err, res);
            }
        );
        return true;
    } catch (error) {
        console.error(error.stack);
        return false;
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

app.get('/logVisit', (req, res) => {
    console.log("logging a visit");
    logVisit().then(result => {
        if (result) {
            res.status(200).send({
                response: "logged a visit"
            });
        }
    });
});

app.get('/systemGenerated/:coordinates', (req, res) => {
    console.log("logging a system generation");
    const {coordinates} = req.params;
    logSystemGenerated(coordinates.toString()).then(result => {
        if (result) {
            res.status(200).send({
                response: `System Generated with seed ${coordinates}`
            });
        }
    });
});