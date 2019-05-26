import React, { useState } from 'react';
import NavBar from './NavBar';
import Input from './Input';
import Output from './Output';

function App () {
  const [input, setInput] = useState("");
  const [dish, setDish] = useState({});
  return (
    <div>
      <NavBar />
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
