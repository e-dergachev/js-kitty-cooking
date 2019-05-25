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

const checkDishes = (keywordToCheck, cuisines) => {
  let db = new sqlite3.Database('./db/recipes.sqlite3'); 
  let cuisinePiece = "";
  if (Array.isArray(cuisines)) {
    cuisines.forEach((cuisine, i) => {
      cuisinePiece += "cuisine = '" + cuisine + "'";
      if (i !== cuisines.length - 1) {cuisinePiece += " OR "}
    });
    cuisinePiece = "(" + cuisinePiece + ")";
  }
  else {
    cuisinePiece = "cuisine = '" + cuisines + "'";
  }
  const sqlQuery = cuisines === "all" ? "SELECT * FROM dishes WHERE tags like '%" + keywordToCheck + "%'" : 
    "SELECT * FROM dishes WHERE " + cuisinePiece + " AND tags like '%" + keywordToCheck + "%'";
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
  const cuisines = req.query.cuisine === undefined ? "all" : req.query.cuisine;
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
    let result = await checkDishes(input[i], cuisines);
    result.forEach(row => rows.push(row));
  }
  rows.forEach(row => {
    let entry = row.dish.substr(0, row.dish.length - 1) + ',"_id":"' + row.id + '","cuisine":"' + row.cuisine + '"}';
    dishes.push(entry);
  })
  dishes = dishes.filter((v, i, a) => a.indexOf(v) === i).map(dish => JSON.parse(dish));
  res.send(dishes)
})

app.listen(process.env.PORT || 3001);
