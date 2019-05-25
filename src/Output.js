import React from 'react';
import './output.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTimes, faRandom } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

library.add(faTimes, faRandom);

function Output(props) {

   const getRandomDish = () => {
      fetch('http://localhost:3001/api/get-random')
      .then(response => response.json())
      .then(result => props.setDish(result));
   };

   if (props.dish.name !== undefined) {
      return (
      <div id ="output">
         <div id="output-cap">
            <span id="cuisine">
               Cuisine: {props.dish.cuisine}
            </span>
            <span className="btn" onClick={() => getRandomDish()} >
               Random <FontAwesomeIcon icon={faRandom} className="decoration" />
            </span>               
            <span className="btn" onClick={() => props.setDish({})} >
               Clear <FontAwesomeIcon icon={faTimes} className="decoration" />
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
            <div id="output-cap">
               <span className="btn" onClick={() => getRandomDish()} >
                  Random <FontAwesomeIcon icon={faRandom} className="decoration" />
               </span>
            </div>
            [Placeholder]
         </div>
      );
   }
}

export default Output;
