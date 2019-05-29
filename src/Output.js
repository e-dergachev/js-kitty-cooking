import React from 'react';
import './output.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTimes, faRandom } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import colors from './colors.js';

library.add(faTimes, faRandom);

function Output(props) {

   const getRandomDish = () => {
      let query = 'http://localhost:3001/api/get-random';
      if (Object.values(props.cuisines).includes(false)) {
         const selectedCuisines = [];
         let queryPiece = '?';
         Object.entries(props.cuisines).filter(el => el[1]).forEach(el => selectedCuisines.push(el[0]));
         selectedCuisines.forEach((cuisine, i) => {
             queryPiece += 'cuisine=' + cuisine;
             if (i !== selectedCuisines.length - 1) {queryPiece += '&'}
         });
         query += queryPiece;
     }
      fetch(query)
      .then(response => response.json())
      .then(result => props.setDish(result));
   };

   if (props.dish.name !== undefined) {
      return (
      <div id ="output" style={{backgroundColor: colors.scheme1.color2, borderColor: colors.scheme1.color5}}>
         <div id="output-cap" style={{color: colors.scheme1.color8}}>
            <span id="cuisine" style={{borderColor: colors.scheme1.color5}}>
               Cuisine: {props.dish.cuisine}
            </span>
            <span className="btn" style={{backgroundColor: colors.scheme1.color4, borderColor: colors.scheme1.color5}} onClick={() => getRandomDish()} >
               Random <FontAwesomeIcon icon={faRandom} className="decoration" style={{color: colors.scheme1.color5}} />
            </span>               
            <span className="btn" style={{backgroundColor: colors.scheme1.color4, borderColor: colors.scheme1.color5}} onClick={() => props.setDish({})} >
               Clear <FontAwesomeIcon icon={faTimes} className="decoration" style={{color: colors.scheme1.color5}} />
            </span>         
         </div>
         {props.dish.name}
         <br />< br />
         {props.dish.recipe}
         <br />< br />
         {props.dish.source}
      </div>
      );
   }
   else {
      return (
         <div id="output" style={{backgroundColor: colors.scheme1.color2, borderColor: colors.scheme1.color5}}>
            <div id="output-cap" style={{color: colors.scheme1.color8}}>
               <span className="btn" style={{backgroundColor: colors.scheme1.color4, borderColor: colors.scheme1.color5}} onClick={() => getRandomDish()} >
                  Random <FontAwesomeIcon icon={faRandom} className="decoration" style={{color: colors.scheme1.color5}} />
               </span>
            </div>
            [Placeholder]
         </div>
      );
   }
}

export default Output;
