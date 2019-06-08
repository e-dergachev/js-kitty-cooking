import React from 'react';
import './output.css';
import './kitty.css';
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
      <div id ="output" style={{backgroundColor: props.scheme.color2, borderColor: props.scheme.color5}}>
         <div id="output-cap" style={{color: props.scheme.color8}}>
            <span id="cuisine" style={{borderColor: props.scheme.color5}}>
               Cuisine: {props.dish.cuisine}
            </span>
            <span className="btn" style={{backgroundColor: props.scheme.color4, borderColor: props.scheme.color5}} onClick={() => getRandomDish()} >
               Random <FontAwesomeIcon icon={faRandom} className="decoration" style={{color: props.scheme.color5}} />
            </span>               
            <span className="btn" style={{backgroundColor: props.scheme.color4, borderColor: props.scheme.color5}} onClick={() => props.setDish({})} >
               Clear <FontAwesomeIcon icon={faTimes} className="decoration" style={{color: props.scheme.color5}} />
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
         <div id="output" style={{backgroundColor: props.scheme.color2, borderColor: props.scheme.color5}}>
            <div id="output-cap" style={{color: props.scheme.color8}}>
               <span className="btn" style={{backgroundColor: props.scheme.color4, borderColor: props.scheme.color5}} onClick={() => getRandomDish()} >
                  Random <FontAwesomeIcon icon={faRandom} className="decoration" style={{color: props.scheme.color5}} />
               </span>
            </div>
            <h1 id="app-title">JS Kitty Cooking</h1>
            <h2 id="app-subtitle">Old recipes from ancient cookbooks</h2>
            <div id="kitty">
               <div id="left-left-ear" className="kitty-pieces" />
               <div id="left-right-ear" className="kitty-pieces" />
               <div id="forehead" className="kitty-pieces" />
               <div id="right-left-ear" className="kitty-pieces" />
               <div id="right-right-ear" className="kitty-pieces" />
               <div id="upper-left-whisker" className="kitty-pieces" />
               <div id="lower-left-whisker" className="kitty-pieces" />
               <div id="upper-right-whisker" className="kitty-pieces" />
               <div id="lower-right-whisker" className="kitty-pieces" />
               <div id="left-lip-outer-circle" className="circles" />
               <div id="left-lip-inner-circle" className="circles" style={{backgroundColor: props.scheme.color2}} />
               <div id="right-lip-outer-circle" className="circles" />
               <div id="right-lip-inner-circle" className="circles" style={{backgroundColor: props.scheme.color2}} />
               <div id="left-outer-eye" className="triangles" />
               <div id="left-inner-eye" className="triangles" style={{backgroundColor: props.scheme.color2}} />
               <div id="right-outer-eye" className="triangles" />
               <div id="right-inner-eye" className="triangles" style={{backgroundColor: props.scheme.color2}} />
               <div id="cover" style={{backgroundColor: props.scheme.color2}} />
               <div id="left-lower-lid" className="kitty-pieces" />
               <div id="left-upper-lid" className="kitty-pieces" style={{backgroundColor: props.scheme.color2}} />
               <div id="right-lower-lid" className="kitty-pieces" />
               <div id="right-upper-lid" className="kitty-pieces" style={{backgroundColor: props.scheme.color2}} />
            </div>
            <div id="bottom-box">
            Choose a color scheme:
               <div id="theme-box">
                  <div id="lavender" 
                     className="theme" 
                     style={{borderColor: props.scheme.color5}} 
                     onClick={() => props.setColorScheme("lavender")} 
                  />
                  <div id="green" 
                     className="theme" 
                     style={{borderColor: props.scheme.color5}}
                     onClick={() => props.setColorScheme("green")}
                  />
                  <div id="pink" 
                     className="theme" 
                     style={{borderColor: props.scheme.color5}}
                     onClick={() => props.setColorScheme("pink")}
                  />
               </div>
               <span id="legal">All the recipes are taken from the public domain books on Guttenberg.com</span>
            </div>
         </div>
      );
   }
}

export default Output;
