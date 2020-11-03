const { Client } = require('pg');

const pgdb = new Client({
  host: 'localhost',
  user: 'johnnytang',
  database: 'mvp'
});

pgdb.connect();

const addSuggestions = function(suggestion, callback) {
  pgdb.query(`INSERT INTO suggestion_history (alias, restaurant, score, date) VALUES ('${suggestion[0].alias}', '${suggestion[0].name.replace(/'/g, `''`)}', ${suggestion[0].score}, CURRENT_DATE), ('${suggestion[1].alias}', '${suggestion[1].name.replace(/'/g, `''`)}', ${suggestion[1].score}, CURRENT_DATE), ('${suggestion[2].alias}', '${suggestion[2].name.replace(/'/g, `''`)}', ${suggestion[2].score}, CURRENT_DATE)`, (err, res) => {
      if (err) {
        callback(err)
      } else {
        callback(null, res)
      }
    })
}

module.exports = {
  addSuggestions
}