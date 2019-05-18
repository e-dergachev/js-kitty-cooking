import React, { useState } from 'react';
import Input from './Input';
import Output from './Output';

function App () {
  const [input, setInput] = useState("");
  const [dish, setDish] = useState({});
  return (
    <div>
      <Input 
        input={input} 
        setInput={setInput} 
        setDish={setDish}
      />
      <Output 
        dish={dish}
        setDish={setDish}
      />
    </div>
  );
}

export default App;
