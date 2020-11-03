const express = require('express');
const bodyParser = require('body-parser');
const yelp = require('yelp-fusion');
const {yelpKey} = require('../Yelp_API.js');
const pgdb = require('../database/Postgres')

const client = yelp.client(yelpKey)

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/../react-client/dist'));

app.get('/api/restaurants', (req, res) => {
  client.search({
  latitude: req.query.latitude,
  longitude: req.query.longitude,
  radius: 20000,
  limit: 50
}).then(response => {
  res.status(200).send(response.jsonBody.businesses)
}).catch(e => {
  console.log(e);
});
})

app.get('/api/restaurants/:restaurantAlias', (req, res) => {
  const alias = req.params.restaurantAlias;
    client.business(alias)
    .then(response => {
      res.status(200).send(response.jsonBody)
    })
    .catch(e => {
      res.status(400).send('error')
    });
})

app.post('/api/restaurants/suggestions', (req, res) => {
  pgdb.addSuggestions(req.body.suggestions, (err, data) => {
      if (err) {
        console.log(err)
        res.status(400).send('could not save')
      } else {
        res.status(200).send('saved successfully')
      }
    })
})

app.get('/api/history', (req, res) => {
  console.log(req.query)
  pgdb.getSuggestions(req.query.date, (err, data) => {
    if (err) {
      res.status(400).send('could not retrieve')
    } else {
      res.status(200).send(data)
    }
  })
})

app.listen(3000, function() {
  console.log('listening on port 3000!');
});

