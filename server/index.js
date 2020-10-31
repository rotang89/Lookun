const express = require('express');
const bodyParser = require('body-parser');
const yelp = require('yelp-fusion');
const {yelpKey} = require('../Yelp_API.js')

const client = yelp.client(yelpKey)

// UNCOMMENT THE DATABASE YOU'D LIKE TO USE
// var items = require('../database-mysql');
// var items = require('../database-mongo');

const app = express();

app.use(express.static(__dirname + '/../react-client/dist'));

app.get('/api/restaurants', (req, res) => {
  client.search({
  latitude: req.query.latitude,
  longitude: req.query.longitude,
  radius: 10000,
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
     }).catch(e => {
      res.status(400).send('error')
     });
})

// client.business('anikis-sushi-fremont').then(response => {
//   console.log(response.jsonBody);
// }).catch(e => {
//   console.log(e);
// });

app.listen(3000, function() {
  console.log('listening on port 3000!');
});

