import React, { useState } from 'react';
import Input from './Input';
import Output from './Output';

function App () {
  const [input, setInput] = useState("");
  return (
    <div>
      <Input input={input} setInput={setInput} />
      <Output input={input} />
    </div>
  );
}

export default App;
