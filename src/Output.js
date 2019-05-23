import React from 'react';
import './output.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

library.add(faTimes)

function Output(props) {
   if (props.dish.name !== undefined) {
      return (
      <div id ="output">
         <div id="output-cap">
            <span id="category">
               Category: {props.dish.category}
            </span>
            <span id="close" onClick={() => props.setDish({})} >
               Clear <FontAwesomeIcon 
                        icon={faTimes} 
                        style={{transform: "translate(0px, 1px)"}}
                     />
            </span>
         </div>
         {props.dish.recipe}
         <br />< br />
         {props.dish.source}
      </div>
      );
   }
   else {
      return (
         <div id="output">
            [Placeholder]
         </div>
      );
   }
}

export default Output;
