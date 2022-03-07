const app = require('express')();
const PORT = 8080;

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