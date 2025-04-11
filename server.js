const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.post('/location', (req, res) => {
  const { latitude, longitude, timestamp, userAgent } = req.body;
  const logEntry = `${timestamp} - Latitude: ${latitude}, Longitude: ${longitude}, User-Agent: ${userAgent}\n`;

  fs.appendFile('locations.log', logEntry, (err) => {
    if (err) {
      console.error('Failed to save location data:', err);
      res.status(500).send('Error saving data');
    } else {
      res.status(200).send('Location data received');
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
