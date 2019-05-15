import React, { useState } from 'react';

const Input = () => {
    const [input, setInput] = useState("");
    return (
      <div id="input">
        <input 
          id="search"
          type="text"
          maxlength="100"
          placeholder="What dish are you going to cook?" 
          value={input}
          onChange={el => setInput(el.target.value)}
        />
        <div id="suggestions">
          {input}
        </div>
      </div>
    );
  }

  export default Input;