import React from 'react';
import './output.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

library.add(faTimes)

function Output(props) {
   return (
   <div id ="output">
      <p id="output-cap">
         <FontAwesomeIcon 
            icon={faTimes} 
            onClick={() => props.setDish({})} 
            style={{cursor: "pointer"}}
         />
      </p>
      {props.dish.recipe}
      <br />< br />
      {props.dish.source}
   </div>
   )
}

export default Output;