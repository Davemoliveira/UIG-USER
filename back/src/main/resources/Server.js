const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3001;

app.get('/server-port', (req, res) => {
  const filePath = path.join(__dirname, 'application.properties');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Error reading file');
    }

    const lines = data.split('\n');
    const portLine = lines.find(line => line.startsWith('server.port='));

    if (portLine) {
      const serverPort = portLine.split('=')[1].trim();
      res.json({ port: serverPort });
    } else {
      res.status(404).send('Server port not found');
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
