const express = require('express');
const bodyParser = require('body-parser');
const yelp = require('yelp-fusion');
const {yelpKey} = require('../Yelp_API.js');
const pgdb = require('../database/Postgres');
const path = require('path')

const client = yelp.client(yelpKey)

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/../react-client/dist'));

const a = []

app.get('/api/heatmap', (req, res) => {
  client.search({
  latitude: req.query.latitude,
  longitude: req.query.longitude,
  radius: req.query.radius,
  limit: 50
})
.then(response1 => {
  client.search({
    latitude: req.query.latitude,
    longitude: req.query.longitude,
    radius: req.query.radius,
    limit: 50,
    offset: 50
  })
  .then(response2 =>{
    res.status(200).send([...response1.jsonBody.businesses, ...response2.jsonBody.businesses])
  })
})
.catch(e => {
  console.log(e);
});
})

app.get('/api/restaurants', (req, res) => {
  console.log(req.query)
  client.search({
  latitude: req.query.latitude,
  longitude: req.query.longitude,
  radius: req.query.radius,
  price: req.query.price,
  term: req.query.term,
  limit: 50
}).then(response => {
  response.jsonBody.businesses.sort(() => Math.random() - 0.5);
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
  pgdb.getSuggestions(req.query.date, (err, data) => {
    if (err) {
      res.status(400).send('could not retrieve')
    } else {
      res.status(200).send(data)
    }
  })
})

app.get('/api/search', (req, res) => {
  const data = req.query;
  if(data.term === '') {
    delete data.term
  }
  if(data.location === '') {
    delete data.location
  } else {
    delete data.latitude;
    delete data.longitude
  }
  delete data.top10;
  delete data.restaurantInfo
  data.limit = 10
  console.log(data)
  client.search(data)
  .then(response => {
    res.status(200).send(response.jsonBody.businesses)
  })
  .catch(e => {
    console.log(e)
  });
})

app.listen(3000, function() {
  console.log('listening on port 3000!');
});

