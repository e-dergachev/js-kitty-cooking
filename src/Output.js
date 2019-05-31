import React from 'react';
import './output.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTimes, faRandom } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
      <div id ="output" style={{backgroundColor: props.colors[props.colorScheme].color2, borderColor: props.colors[props.colorScheme].color5}}>
         <div id="output-cap" style={{color: props.colors[props.colorScheme].color8}}>
            <span id="cuisine" style={{borderColor: props.colors[props.colorScheme].color5}}>
               Cuisine: {props.dish.cuisine}
            </span>
            <span className="btn" style={{backgroundColor: props.colors[props.colorScheme].color4, borderColor: props.colors[props.colorScheme].color5}} onClick={() => getRandomDish()} >
               Random <FontAwesomeIcon icon={faRandom} className="decoration" style={{color: props.colors[props.colorScheme].color5}} />
            </span>               
            <span className="btn" style={{backgroundColor: props.colors[props.colorScheme].color4, borderColor: props.colors[props.colorScheme].color5}} onClick={() => props.setDish({})} >
               Clear <FontAwesomeIcon icon={faTimes} className="decoration" style={{color: props.colors[props.colorScheme].color5}} />
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
         <div id="output" style={{backgroundColor: props.colors[props.colorScheme].color2, borderColor: props.colors[props.colorScheme].color5}}>
            <div id="output-cap" style={{color: props.colors[props.colorScheme].color8}}>
               <span className="btn" style={{backgroundColor: props.colors[props.colorScheme].color4, borderColor: props.colors[props.colorScheme].color5}} onClick={() => getRandomDish()} >
                  Random <FontAwesomeIcon icon={faRandom} className="decoration" style={{color: props.colors[props.colorScheme].color5}} />
               </span>
            </div>
            [Placeholder]
            <div 
               className="placeholder" 
               style={{backgroundColor: "#e6e6fa", borderColor: props.colors[props.colorScheme].color5}} 
               onClick={() => props.setColorScheme("lavender")}
            />
            <div 
               className="placeholder" 
               style={{backgroundColor: "#b3ff99", borderColor: props.colors[props.colorScheme].color5}}
               onClick={() => props.setColorScheme("green")}
            />            
            <div 
               className="placeholder" 
               style={{backgroundColor: "#efa7c0", borderColor: props.colors[props.colorScheme].color5}} 
               onClick={() => props.setColorScheme("pink")}
            />
         </div>
      );
   }
}

export default Output;
