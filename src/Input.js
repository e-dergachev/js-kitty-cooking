import React, { useState } from 'react';
import './input.css';

//let reset = false;

function Input(props) {

  const [dishes, setDishes] = useState([]);

  const suggestions = input => {
    fetch('http://localhost:3001/api/get-suggestions?input=' + input)
    .then(response => response.json())
    .then(result => setDishes(result));
    return dishes.map((dish, i) => 
      <p 
        key={dish._id}
        className="suggestion"
        style={i%2 === 0 ? {backgroundColor: "#d9d9d9"} : {backgroundColor: "#f2f2f2"}}
        onClick={() => props.setDish(dish)}
      >
        {dish.name}
      </p>
    )
  }

  return (
    <div id="input">
      <input 
        id="search"
        type="text"
        maxLength="100"
        placeholder="What dish are you going to cook?" 
        value={props.input}
        onChange={el => props.setInput(el.target.value)}
      />
      <div id="suggestions">
        {suggestions(props.input)}
      </div>
    </div>
  );
}

export default Input;