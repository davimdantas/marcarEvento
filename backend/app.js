const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const intervalChanges = [];

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');

  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/api/interval', (req, res, next) => {
  const changes = req.body;
  console.log('\n', changes);
  this.intervalChanges = [...changes];
  console.log('\n interval: ', this.intervalChanges);

  res.status(201).json({
    message: 'Change saved'
  });
});

app.use('/api/interval', (req, res, next) => {
  const changes = [new Date(), new Date() + 10, '10:00', '12:00', [1, 3, 5]];
  res.json('Changes fetched succesfully!');
  console.log('\n No back ', this.intervalChanges);
});

module.exports = app;
