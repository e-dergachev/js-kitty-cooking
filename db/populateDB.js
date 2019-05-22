const sqlite3 = require('sqlite3').verbose();
const entries = require('./entries');

const dishes = [];

entries.forEach(entry => {
  const dish = {name: entry.name, recipe: entry.recipe, source: entry.source};
  dishes.push([JSON.stringify(dish), entry.tags, entry.category]);
});

let db = new sqlite3.Database('./recipes.sqlite3');

db.serialize(() => {
  db.run("CREATE TABLE IF NOT EXISTS dishes (id INTEGER PRIMARY KEY AUTOINCREMENT, dish TEXT, tags TEXT, category TEXT)");
  for (let i = 0; i < dishes.length; i++) {
    db.run("INSERT INTO dishes (dish, tags, category) VALUES (?, ?, ?)", dishes[i]);
  }
})