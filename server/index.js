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
  console.log(req.query)
})
// client.search({
//   latitude: 37.553790,
//   longitude: -121.988900,
//   radius: 10000,
//   limit: 50
// }).then(response => {
//   response.jsonBody.businesses.map((restaurant => {
//     console.log(restaurant.name)
//   }));
// }).catch(e => {
//   console.log(e);
// });

app.listen(3000, function() {
  console.log('listening on port 3000!');
});

