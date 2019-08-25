const express = require('express');
const app = express();
const sqlite3 = require('sqlite3').verbose();
const dotenv = require('dotenv');
dotenv.config();

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(process.cwd() + '/build'));
  app.get('/', (req, res) => res.sendFile(process.cwd() + '/build/index.html'));
}
else {
  app.use((req, res, next) => { //need it for development cors requests
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  app.use('/public', express.static(process.cwd() + '/public'));
  app.get('/', (req, res) => res.sendFile(process.cwd() + '/public/index.html'));
}

const getCuisinePiece = (cuisines) => { //unselecting everything is equal to selecting everything
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

const getTagPiece = (input) => {
  const filtered = input.filter(el => el.length >= 3);
  let tagPiece = '';
  filtered.forEach((tag, i) => {
    tagPiece += 'tags like "%' + tag + '%"';
      if (i !== filtered.length - 1) {tagPiece += ' AND '} //currently it is set to look for the combination of tags, not for any tag
    });
  tagPiece = '(' + tagPiece + ')';
  return tagPiece;
}

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

const checkDishes = (input, cuisines) => {
  const cuisinePiece = getCuisinePiece(cuisines);
  const tagPiece = getTagPiece(input);
  const sqlQuery = cuisines === "all" ? "SELECT * FROM dishes WHERE" + tagPiece : 
    "SELECT * FROM dishes WHERE " + cuisinePiece + " AND tags like '%" + tagPiece;
  return getPromisedResult(sqlQuery);
};

const getRandomDish = (cuisines) => {
  const cuisinePiece = getCuisinePiece(cuisines);
  const sqlQuery = cuisines === "all" ? "SELECT * FROM dishes ORDER BY RANDOM() LIMIT 1" : 
    "SELECT * FROM dishes WHERE " + cuisinePiece + " ORDER BY RANDOM() LIMIT 1";  
  return getPromisedResult(sqlQuery);
};

app.get('/api/get-suggestions', async (req, res) => {
  try {
    const cuisines = req.query.cuisine === undefined ? "all" : req.query.cuisine;
    const input = req.query.input.split(" ");
    if (input.every(el => el.length < 3)) {
      res.send([]);
      return;
    }
    let rows = [], dishes = [];
    let result = await checkDishes(input, cuisines);
    result.forEach(row => rows.push(row));
    rows.forEach(row => {
      let entry = row.dish.substr(0, row.dish.length - 1) + ',"_id":"' + row.id + '","cuisine":"' + row.cuisine + '"}';
      dishes.push(entry);
    });
    dishes = dishes.filter((v, i, a) => a.indexOf(v) === i).map(dish => JSON.parse(dish));
    res.send(dishes)
  }
  catch(error) {
    console.log(error);
  }
});

app.get('/api/get-random', async (req, res) => {
  try {
    const cuisines = req.query.cuisine === undefined ? "all" : req.query.cuisine;
    let row = await getRandomDish(cuisines);
    row = row[0];
    let result = row.dish.substr(0, row.dish.length - 1) + ',"_id":"' + row.id + '","cuisine":"' + row.cuisine + '"}';
    res.send(result);
  }
  catch(error) {
    console.log(error);
  }
});

app.listen(process.env.PORT || 3001);
