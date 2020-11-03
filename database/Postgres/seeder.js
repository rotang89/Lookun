const data = [
  [ "Aniki's Sushi", 'anikis-sushi-fremont' ],
  [ 'Sala Thai', 'sala-thai-fremont-2' ],
  [ 'Din Ding Dumpling House', 'din-ding-dumpling-house-fremont-4' ],
  [ 'Country Way', 'country-way-fremont-2' ],
  [ 'De Afghanan Cuisine', 'de-afghanan-cuisine-fremont' ],
  [ 'Satomi Sushi', 'satomi-sushi-fremont' ],
  [ 'Falafel, Etc', 'falafel-etc-fremont' ],
  [ "Skillet'z Cafe", 'skilletz-cafe-fremont' ],
  [ 'Devout Coffee', 'devout-coffee-fremont' ],
  [ 'Le Moose Crepe Cafe', 'le-moose-crepe-cafe-fremont' ],
  [ 'Nothing Bundt Cakes', 'nothing-bundt-cakes-fremont-2' ],
  [ "Frodo Joe's Petit Cafe", 'frodo-joes-petit-cafe-fremont' ],
  [ 'Bun Appétit Donuts', 'bun-appétit-donuts-fremont-2' ],
  [ 'Philz Coffee', 'philz-coffee-fremont-10' ],
  [ 'Sweet Garden', 'sweet-garden-fremont' ],
  [ 'Shalimar Restaurant', 'shalimar-restaurant-fremont' ],
  [ 'Bear Bitez', 'bear-bitez-newark' ],
  [ 'Gaters', 'gaters-fremont-3' ],
  [ 'Lake Elizabeth', 'lake-elizabeth-fremont' ],
  [ 'Mioki Sushi', 'mioki-sushi-fremont' ],
  [ 'Gen Korean BBQ House', 'gen-korean-bbq-house-fremont-3' ],
  [ 'Green Champa Garden', 'green-champa-garden-fremont' ],
  [ 'Taqueria Limon', 'taqueria-limon-fremont-2' ],
  [ "Jack's Restaurant & Bar", 'jacks-restaurant-and-bar-newark-2' ],
  [ 'The Counter Fremont', 'the-counter-fremont-fremont-3' ],
  [ 'Fremont Afghan Kabob', 'fremont-afghan-kabob-fremont' ],
  [ "Menchie's Frozen Yogurt", 'menchies-frozen-yogurt-fremont' ],
  [ 'Gonutz', 'gonutz-fremont-3' ],
  [ 'Daily Bagel Cafe', 'daily-bagel-cafe-fremont' ],
  [ "Peet's Coffee", 'peets-coffee-fremont-2' ],
  [ 'Pieology Pizzeria', 'pieology-pizzeria-fremont' ],
  [ 'Dish N Dash', 'dish-n-dash-fremont-2' ],
  [ 'Amia Bakery', 'amia-bakery-fremont' ],
  [ 'Sweet Orchid', 'sweet-orchid-fremont' ],
  [ 'Gelato Classico Italian Ice Cream', 'gelato-classico-italian-ice-cream-fremont-2'],
  [ 'Lazy Dog Restaurant & Bar', 'lazy-dog-restaurant-and-bar-newark-2'],
  [ 'Curry Pizza House', 'curry-pizza-house-fremont-3' ],
  [ 'Ristorante il Porcino', 'ristorante-il-porcino-fremont-2' ],
  [ 'Royaltea USA', 'royaltea-usa-fremont' ],
  [ 'Market Broiler - Fremont', 'market-broiler-fremont-fremont' ],
  [ 'Tadamasa', 'tadamasa-union-city-2' ],
  [ 'Flaming House Restaurant & Bar', 'flaming-house-restaurant-and-bar-newark'],
  [ 'Mission Peak Regional Park', 'mission-peak-regional-park-fremont'],
  [ 'Niles Ice Cream Sweets & Eats', 'niles-ice-cream-sweets-and-eats-fremont-2'],
  [ 'Rice Junky', 'rice-junky-fremont' ],
  [ "Bill's Cafe", 'bills-cafe-fremont-3' ],
  [ 'Cal Eats Fresh Mexican Grill', 'cal-eats-fresh-mexican-grill-newark-2'],
  [ "Minia's Bake Shop", 'minias-bake-shop-newark' ],
  [ 'Miki Bistro', 'miki-bistro-fremont' ],
  [ 'Papillon', 'papillon-fremont' ]
]

const pgdb = require('./index.js')

for (let i = 0; i < 200; i++) {
  const date = `2020-${Math.ceil(Math.random()*12)}-${Math.ceil(Math.random()*30)}`
  const score = Math.ceil(Math.random()*10)
  const index = Math.floor(Math.random()*data.length)
  const x = {
    score: score,
    date: date,
    alias: data[index][1],
    name: data[index][0]
  }
  pgdb.Seed(x, ()=>{})
}