import React, { useState } from 'react';
import './input.css';

function Input(props) {

  const [input, setInput] = useState("");
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
        style={{backgroundColor: i%2 === 0 ? props.scheme.color2 : props.scheme.color4}}
        onClick={() => props.setDish(dish)}
      >
        {dish.name}
      </div>
    )
  }

  return (
    <div id="input" style={{backgroundColor: props.scheme.color2, borderColor: props.scheme.color5}}>
      <input 
        id="search"
        type="text"
        maxLength="100"
        placeholder="What dish are you going to cook?" 
        value={input}
        onChange={el => setInput(el.target.value)}
        style={{backgroundColor: props.scheme.color2, borderColor: props.scheme.color5}}
      />
      <div id="suggestions" style={{backgroundColor: props.scheme.color2}}>
        {suggestions(input)}
      </div>
    </div>
  );
}

export default Input;
