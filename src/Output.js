import React from 'react';
import './output.css';

function Output(props) {
   return (
   <div id ="output">
      {props.dish.recipe}
      <br />< br />
      {props.dish.source}
   </div>
   )
}

export default Output;