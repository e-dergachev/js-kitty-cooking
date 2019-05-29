import React, { useState } from 'react';
import './navbar.css';
import colors from './colors.js';

function NavBar(props) {

   const [navFolded, setNavFolded] = useState(true);
   
   const navBar = () => {
     if (navFolded) {
       return (
         <div id="nav-bar" style={{backgroundColor: colors.scheme1.color3, borderColor: colors.scheme1.color5, color: colors.scheme1.color7}} onClick={() => setNavFolded(false)} >
           <div className="msg instruction-msg">Click to select cuisines</div>
         </div>    
       );
     }
     else {
       return (
         <div id="nav-bar-unfolded" style={{backgroundColor: colors.scheme1.color4, borderColor: colors.scheme1.color5, color: colors.scheme1.color7}} onClick={() => setNavFolded(true)}>
           <div className="msg instruction-unfolded-msg">Click cuisines to select/unselect them, click the bar again to close it.</div>
           <div className="msg cuisine-msg"
             style={{backgroundColor: props.cuisines.General ? colors.scheme1.color3 : colors.scheme1.color4, borderColor: colors.scheme1.color5}}
             onClick={(e) => {
               e.stopPropagation(); 
               props.cuisines.General ? props.setCuisines(prevState => {return {...prevState, General: false}}) : props.setCuisines(prevState => {return {...prevState, General: true}});
             }}
           >General</div>
           <div className="msg cuisine-msg"
             style={{backgroundColor: props.cuisines.Vegetarian ? colors.scheme1.color3 : colors.scheme1.color4, borderColor: colors.scheme1.color5}}
             onClick={(e) => {
               e.stopPropagation(); 
               props.cuisines.Vegetarian ? props.setCuisines(prevState => {return {...prevState, Vegetarian: false}}) : props.setCuisines(prevState => {return {...prevState, Vegetarian: true}});
             }}          
           >Vegetarian</div>
           <div className="msg cuisine-msg"
             style={{backgroundColor: props.cuisines.American ? colors.scheme1.color3 : colors.scheme1.color4, borderColor: colors.scheme1.color5}}
             onClick={(e) => {
               e.stopPropagation(); 
               props.cuisines.American ? props.setCuisines(prevState => {return {...prevState, American: false}}) : props.setCuisines(prevState => {return {...prevState, American: true}});
             }}              
           >American</div>
           <div className="msg cuisine-msg"
             style={{backgroundColor: props.cuisines.French ? colors.scheme1.color3 : colors.scheme1.color4, borderColor: colors.scheme1.color5}}
             onClick={(e) => {
               e.stopPropagation(); 
               props.cuisines.French ? props.setCuisines(prevState => {return {...prevState, French: false}}) : props.setCuisines(prevState => {return {...prevState, French: true}});
             }}              
           >French</div>
           <div className="msg cuisine-msg"
             style={{backgroundColor: props.cuisines.Indian ? colors.scheme1.color3 : colors.scheme1.color4, borderColor: colors.scheme1.color5}}
             onClick={(e) => {
               e.stopPropagation(); 
               props.cuisines.Indian ? props.setCuisines(prevState => {return {...prevState, Indian: false}}) : props.setCuisines(prevState => {return {...prevState, Indian: true}});
             }}                
           >Indian</div>
           <div className="msg cuisine-msg"
             style={{backgroundColor: props.cuisines.Italian ? colors.scheme1.color3 : colors.scheme1.color4, borderColor: colors.scheme1.color5}}
             onClick={(e) => {
               e.stopPropagation(); 
               props.cuisines.Italian ? props.setCuisines(prevState => {return {...prevState, Italian: false}}) : props.setCuisines(prevState => {return {...prevState, Italian: true}});
             }}                
           >Italian</div>
           <div className="msg cuisine-msg"
             style={{backgroundColor: props.cuisines.Jewish ? colors.scheme1.color3 : colors.scheme1.color4, borderColor: colors.scheme1.color5}}
             onClick={(e) => {
               e.stopPropagation(); 
               props.cuisines.Jewish ? props.setCuisines(prevState => {return {...prevState, Jewish: false}}) : props.setCuisines(prevState => {return {...prevState, Jewish: true}});
             }}                
           >Jewish</div>
         </div>
       )
     }
   }
   
   return (
     <div>
       {navBar()}
     </div>
   )
 }

   export default NavBar;
