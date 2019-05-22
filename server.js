const express = require('express');
const app = express();
const sqlite3 = require('sqlite3').verbose();

app.use((req, res, next) => { //need it for development cors requests
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', (req, res) => res.sendFile(process.cwd() + '/public/index.html'));

const checkDishes = (keywordToCheck, category) => {
  let db = new sqlite3.Database('./db/recipes.sqlite3'); 
  const sqlQuery = category === "all" ? "SELECT * FROM dishes WHERE tags like '%" + keywordToCheck + "%'" : 
    "SELECT * FROM dishes WHERE category = '" + category + "' AND tags like '%" + keywordToCheck + "%'";
  const promisedResult = new Promise((resolve, reject) => {
  db.all(sqlQuery, (err, rows) => {
    if (err) {
      reject(err);
      return;
    }
      resolve(rows);
    })
  })
  db.close();
  return promisedResult;
}

app.get('/api/get-suggestions', async (req, res) => {
  const category = req.query.category === undefined ? "all" : req.query.category;
  const input = req.query.input.split(" ");
  if (input[0].length < 3) {
    res.send([]);
    return;
  }
  let rows = [], dishes = [];
  for (let i = 0; i < input.length; i++) {
    if (input[i].length < 3) {
      continue; //to avoid excessive db queries, anyway the tags are 3 letters minimum
    }
    let result = await checkDishes(input[i], category);
    result.forEach(row => rows.push(row));
  }
  rows.forEach(row => {
    let entry = row.dish.substr(0, row.dish.length - 1) + ',"_id":"' + row.id + '","category":"' + row.category + '"}';
    dishes.push(entry);
  })
  dishes = dishes.filter((v, i, a) => a.indexOf(v) === i).map(dish => JSON.parse(dish));
  res.send(dishes)
})

app.listen(process.env.PORT || 3001);
