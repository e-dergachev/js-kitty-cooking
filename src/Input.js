import React from 'react';
import './input.css';

function Input(props) {
    return (
      <div id="input">
        <input 
          id="search"
          type="text"
          maxlength="100"
          placeholder="What dish are you going to cook?" 
          value={props.input}
          onChange={el => props.setInput(el.target.value)}
        />
        <div id="suggestions">
          {props.input}
        </div>
      </div>
    );
  }

  export default Input;