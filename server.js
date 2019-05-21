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

/*const testEntries = [   //a piece of test db entries, to move to a separate file
  {
      name: "To Soft Boil Eggs", 
      keywords: "soft boil boiled egg eggs ",
      recipe: "Cover the eggs with cold water in a saucepan, place over the fire, and when the water comes to the boiling point the eggs are perfectly cooked; remove at once and serve.",
      source: "The Golden Age Cook Book, by Henrietta Latham Dwight",
  },
  {
      name: "To Hard Boil Eggs",
      keywords: "hard boil boiled egg eggs ",
      recipe: "Put the eggs in boiling water and boil hard for ten minutes, set them where they will boil gently for ten minutes more, then remove from the fire. Eggs boiled in this way will be tender and digestible.",
      source: "The Golden Age Cook Book, by Henrietta Latham Dwight",
  },
  {
      name: "Plain Omelet",
      keywords: "plain omelet ",
      recipe: "Beat six eggs, the yolks to a cream, the whites to a stiff froth, add three tablespoonfuls of warm milk to the yolks and then beat into the whites of eggs. Put a small tablespoonful of butter in a spider, when it is hot turn the eggs into it, stirring gently all the time until the eggs are well set; let it brown, fold and turn out on a hot platter.",
      source: "The Golden Age Cook Book, by Henrietta Latham Dwight",
  },
  {
      name: "English Plum Pudding",
      keywords: "english plum pudding ",
      recipe: "Two pounds of raisins, one pound of currants, one pound of citron, half a pound of almonds, one pound of butter, one pound of flour, one pound of brown sugar, one teaspoonful each of ground cinnamon, cloves, allspice, ginger and nutmeg, half a pint of brandy and wine mixed and one dozen eggs. Boil six hours. Keep water boiling by the side of pudding boiler all the time and continually refill as the water evaporates. In preparing the pudding have all the fruit stoned and cut, but not too fine, the almonds blanched and chopped. Incorporate all the ingredients well together before adding the eggs and spirits and beat the mixture well together for at least an hour—the longer the better.",
      source: "The Golden Age Cook Book, by Henrietta Latham Dwight",
  }
];

const dishes = [];

testEntries.forEach(entry => {
const dish = {name: entry.name, recipe: entry.recipe, source: entry.source};
dishes.push([JSON.stringify(dish), entry.keywords]);
});

//database stuff 
let db = new sqlite3.Database('./db/recipes.sqlite3');

db.serialize(() => {
  db.run("CREATE TABLE IF NOT EXISTS dishes (id INTEGER PRIMARY KEY AUTOINCREMENT, dish TEXT, tags TEXT)");
  for (let i = 0; i < dishes.length; i++) {
    db.run("INSERT INTO dishes (dish, tags) VALUES (?, ?)", dishes[i]);
  }
})*/

const checkDishes = (keywordToCheck) => {
  let db = new sqlite3.Database('./db/recipes.sqlite3'); 
  const promisedResult = new Promise((resolve, reject) => {
  db.all("SELECT * FROM dishes WHERE tags like '%" + keywordToCheck + "%'", (err, rows) => {
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
    let result = await checkDishes(input[i]);
    result.forEach(row => rows.push(row));
  }
  rows.forEach(row => {
    let entry = row.dish.substr(0, row.dish.length - 1) + ',"_id":"' + row.id + '"}';
    dishes.push(entry);
  })
  dishes = dishes.filter((v, i, a) => a.indexOf(v) === i).map(dish => JSON.parse(dish));
  res.send(dishes)
})

app.listen(process.env.PORT || 3001);