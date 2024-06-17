// server.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const xml2js = require('xml2js');

const app = express();
const port = 3001;

app.get('/java-version', (req, res) => {
    const pomPath = path.join(__dirname, 'pom.xml');
    fs.readFile(pomPath, (err, data) => {
        if (err) {
            return res.status(500).send('Error reading pom.xml');
        }
        xml2js.parseString(data, (err, result) => {
            if (err) {
                return res.status(500).send('Error parsing XML');
            }
            const javaVersion = result.project.properties[0]['maven.compiler.source'][0];
            res.json({ javaVersion });
        });
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
