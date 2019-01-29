const express = require('express');
const bodyParser = require('body-parser');
const app = express();
let intervalChanges;

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');

  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/api/interval', (req, res, next) => {
  intervalChanges = req.body;
  res.status(201).json({
    message: 'Change saved'
  });
});

app.use('/api/interval', (req, res, next) => {
  res.json(intervalChanges);
});

module.exports = app;
