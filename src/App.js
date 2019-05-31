import React, { useState, useEffect } from 'react';
import NavBar from './NavBar';
import Input from './Input';
import Output from './Output';
import colors from './colors.js';

function App () {
  const [input, setInput] = useState("");
  const [dish, setDish] = useState({});
  const [cuisines, setCuisines] = useState({General: true, Vegetarian: true, American: true, French: true, Indian: true, Italian: true, Jewish: true});
  const [colorScheme, setColorScheme] = useState("lavender");

  useEffect(() => {
    document.body.style.backgroundColor = colors[colorScheme].color1;
    document.body.style.color = colors[colorScheme].color6;
  });

  return (
    <div>
      <NavBar 
        cuisines={cuisines}
        setCuisines={setCuisines}
        colors={colors}
        colorScheme={colorScheme}
      />
      <Input 
        input={input} 
        setInput={setInput} 
        setDish={setDish}
        cuisines={cuisines}
        colors={colors}
        colorScheme={colorScheme}
      />
      <Output 
        dish={dish}
        setDish={setDish}
        cuisines={cuisines}
        colors={colors}
        colorScheme={colorScheme}
        setColorScheme={setColorScheme}
      />
    </div>
  );
}

export default App;
