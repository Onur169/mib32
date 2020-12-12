const fs = require('fs');
const https = require('https');
const express = require('express');
const cors = require('cors');
const app = express();

const key = fs.readFileSync(__dirname + '/ssl/stern_web-arts_de.key');
const cert = fs.readFileSync(__dirname + '/ssl/stern_web-arts_de.crt');

app.use(cors());
app.use(express.static('src'));

const port = 3000;

https.createServer({
    key: key,
    cert: cert,
}, app).listen(port, () => {

    console.log('>>> server is running on port ' + port);
});