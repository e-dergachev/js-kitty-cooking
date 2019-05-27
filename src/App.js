import React, { useState } from 'react';
import NavBar from './NavBar';
import Input from './Input';
import Output from './Output';

function App () {
  const [input, setInput] = useState("");
  const [dish, setDish] = useState({});
  const [cuisines, setCuisines] = useState({General: true, Vegetarian: true, American: true, French: true, Indian: true, Italian: true, Jewish: true});
  return (
    <div>
      <NavBar 
        cuisines={cuisines}
        setCuisines={setCuisines}
      />
      <Input 
        input={input} 
        setInput={setInput} 
        setDish={setDish}
        cuisines={cuisines}
      />
      <Output 
        dish={dish}
        setDish={setDish}
        cuisines={cuisines}
      />
    </div>
  );
}

export default App;
