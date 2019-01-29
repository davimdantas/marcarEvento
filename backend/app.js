const express = require('express');
const bodyParser = require('body-parser');
const app = express();
let intervalChanges = [];

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
  console.log('\n Post changes: ', changes);
  intervalChanges = [...changes];
  console.log('\n Post interval: ', intervalChanges);

  res.status(201).json({
    message: 'Change saved'
  });
});

app.use('/api/interval', (req, res, next) => {
  if (intervalChanges.length > 0) {
    const changes = {
      firstday: intervalChanges[0],
      lastday: intervalChanges[1],
      firsthour: intervalChanges[2],
      lasthour: intervalChanges[3],
      weekday: intervalChanges[4]
    };
    res.json(changes);
  } else {
    console.log('\n No back ', intervalChanges);
    res.json('Changes not made yet');
  }
});

module.exports = app;
