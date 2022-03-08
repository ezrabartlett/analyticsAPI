const app = require('express')();

const firebaseConfig = {
  apiKey: "AIzaSyDkZGSEMz286KKW4CrxU3YBJf6WojlC_uY",
  authDomain: "personalsiteanalytics.firebaseapp.com",
  projectId: "personalsiteanalytics",
  storageBucket: "personalsiteanalytics.appspot.com",
  messagingSenderId: "167308055246",
  appId: "1:167308055246:web:f39e36774e453789ca769f"
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