import React, { useState } from 'react';
import './input.css';
import colors from './colors.js';

//let reset = false;

function Input(props) {

  const [dishes, setDishes] = useState([]);

  const suggestions = input => {
    let query = 'http://localhost:3001/api/get-suggestions?input=' + input;
    if (Object.values(props.cuisines).includes(false)) {
      const selectedCuisines = [];
      let queryPiece = '&';
      Object.entries(props.cuisines).filter(el => el[1]).forEach(el => selectedCuisines.push(el[0]));
      selectedCuisines.forEach((cuisine, i) => {
          queryPiece += 'cuisine=' + cuisine;
          if (i !== selectedCuisines.length - 1) {queryPiece += '&'}
      });
      query += queryPiece;
    }
    fetch(query)
    .then(response => response.json())
    .then(result => setDishes(result));
    return dishes.map((dish, i) => 
      <div
        key={dish._id}
        className="suggestion"
        style={{backgroundColor: i%2 === 0 ? colors.scheme1.color2 : colors.scheme1.color4}}
        onClick={() => props.setDish(dish)}
      >
        {dish.name}
      </div>
    )
  }

  return (
    <div id="input" style={{backgroundColor: colors.scheme1.color2, borderColor: colors.scheme1.color5}}>
      <input 
        id="search"
        type="text"
        maxLength="100"
        placeholder="What dish are you going to cook?" 
        value={props.input}
        onChange={el => props.setInput(el.target.value)}
        style={{backgroundColor: colors.scheme1.color2, borderColor: colors.scheme1.color5}}
      />
      <div id="suggestions" style={{backgroundColor: colors.scheme1.color2}}>
        {suggestions(props.input)}
      </div>
    </div>
  );
}

export default Input;
