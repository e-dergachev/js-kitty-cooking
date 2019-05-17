const express = require('express');
const app = express();

app.use((req, res, next) => { //need it for development cors requests
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

const database = [   //currently uses a bunch of mock-ups before i add a db
    {
        name: "To Soft Boil Eggs", 
        keywords: ["soft", "boil", "boiled", "egg", "eggs"],
        recipe: "Cover the eggs with cold water in a saucepan, place over the fire, and when the water comes to the boiling point the eggs are perfectly cooked; remove at once and serve.",
        source: "The Golden Age Cook Book, by Henrietta Latham Dwight",
        _id: 1
    },
    {
        name: "To Hard Boil Eggs",
        keywords: ["hard", "boil", "boiled", "egg", "eggs"],
        recipe: "Put the eggs in boiling water and boil hard for ten minutes, set them where they will boil gently for ten minutes more, then remove from the fire. Eggs boiled in this way will be tender and digestible.",
        source: "The Golden Age Cook Book, by Henrietta Latham Dwight",
        _id: 2
    },
    {
        name: "Plain Omelet",
        keywords: ["plain", "omelet"],
        recipe: "Beat six eggs, the yolks to a cream, the whites to a stiff froth, add three tablespoonfuls of warm milk to the yolks and then beat into the whites of eggs. Put a small tablespoonful of butter in a spider, when it is hot turn the eggs into it, stirring gently all the time until the eggs are well set; let it brown, fold and turn out on a hot platter.",
        source: "The Golden Age Cook Book, by Henrietta Latham Dwight",
        _id: 3
    },
    {
        name: "English Plum Pudding",
        keywords: ["english", "plum", "pudding"],
        recipe: "Two pounds of raisins, one pound of currants, one pound of citron, half a pound of almonds, one pound of butter, one pound of flour, one pound of brown sugar, one teaspoonful each of ground cinnamon, cloves, allspice, ginger and nutmeg, half a pint of brandy and wine mixed and one dozen eggs. Boil six hours. Keep water boiling by the side of pudding boiler all the time and continually refill as the water evaporates. In preparing the pudding have all the fruit stoned and cut, but not too fine, the almonds blanched and chopped. Incorporate all the ingredients well together before adding the eggs and spirits and beat the mixture well together for at least an hour—the longer the better.",
        source: "The Golden Age Cook Book, by Henrietta Latham Dwight",
        _id: 4
    }
  ];

const checkDishes = (keywordToCheck) => { //a mock-up for looking by a subdoc property
const result = [];
for (let i = 0; i < database.length; i++) {
    if (database[i].keywords.indexOf(keywordToCheck) !== -1) {
        result.push(database[i]);
    }
}
return result;
}

app.use('/public', express.static(process.cwd() + '/public'));

app.get('/api/get-suggestions', (req, res) => { //to seriously improve search later
  const input = req.query.input;
  let dishes = []
    input.split(" ").forEach(keyword => {
        const result = checkDishes(keyword);
        result.forEach(dish => dishes.push(dish))
    })
    dishes = dishes.filter((v, i, a) => a.indexOf(v) === i)
  res.send(dishes)
});

app.get('/', (req, res) => res.sendFile(process.cwd() + '/public/index.html'))

app.listen(process.env.PORT || 3001)