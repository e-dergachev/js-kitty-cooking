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

const getCuisinePiece = (cuisines) => {
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
  return cuisinePiece;
};

const getPromisedResult = (sqlQuery) => {
  const db = new sqlite3.Database('./db/recipes.sqlite3'); 
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

const checkDishes = (keywordToCheck, cuisines) => {
  const cuisinePiece = getCuisinePiece(cuisines);
  const sqlQuery = cuisines === "all" ? "SELECT * FROM dishes WHERE tags like '%" + keywordToCheck + "%'" : 
    "SELECT * FROM dishes WHERE " + cuisinePiece + " AND tags like '%" + keywordToCheck + "%'";
  return getPromisedResult(sqlQuery);
};

const getRandomDish = (cuisines) => {
  const cuisinePiece = getCuisinePiece(cuisines);
  const sqlQuery = cuisines === "all" ? "SELECT * FROM dishes ORDER BY RANDOM() LIMIT 1" : 
    "SELECT * FROM dishes WHERE " + cuisinePiece + " ORDER BY RANDOM() LIMIT 1";  
  return getPromisedResult(sqlQuery);
};

app.get('/api/get-suggestions', async (req, res) => {
  const cuisines = req.query.cuisine === undefined ? "all" : req.query.cuisine;
  const input = req.query.input.split(" ");
  if (input.every(el => el.length < 3)) {
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
  });
  dishes = dishes.filter((v, i, a) => a.indexOf(v) === i).map(dish => JSON.parse(dish));
  res.send(dishes)
});

app.get('/api/get-random', async (req, res) => {
  const cuisines = req.query.cuisine === undefined ? "all" : req.query.cuisine;
  let row = await getRandomDish(cuisines);
  row = row[0];
  let result = row.dish.substr(0, row.dish.length - 1) + ',"_id":"' + row.id + '","cuisine":"' + row.cuisine + '"}';
  res.send(result);
});

app.listen(process.env.PORT || 3001);
