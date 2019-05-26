import React, { useState } from 'react';
import './navbar.css';

function NavBar(props) {

   const [navFolded, setNavFolded] = useState(true);
   
   const navBar = () => {
     if (navFolded) {
       return (
         <div id="nav-bar" onClick={() => setNavFolded(false)} >
           <div className="msg instruction-msg">Click to select cuisines</div>
         </div>    
       );
     }
     else {
       return (
         <div id="nav-bar-unfolded" onClick={() => setNavFolded(true)}>
           <div className="msg instruction-unfolded-msg">Click cuisines to select/unselect them, click the bar again to close it.</div>
           <div className="msg cuisine-msg"
             style={props.cuisines.General ? {backgroundColor: "#d9d9d9"} : {backgroundColor: "#f2f2f2"}}
             onClick={(e) => {
               e.stopPropagation(); 
               props.cuisines.General ? props.setCuisines(prevState => {return {...prevState, General: false}}) : props.setCuisines(prevState => {return {...prevState, General: true}});
             }}
           >General</div>
           <div className="msg cuisine-msg"
             style={props.cuisines.Vegetarian ? {backgroundColor: "#d9d9d9"} : {backgroundColor: "#f2f2f2"}}
             onClick={(e) => {
               e.stopPropagation(); 
               props.cuisines.Vegetarian ? props.setCuisines(prevState => {return {...prevState, Vegetarian: false}}) : props.setCuisines(prevState => {return {...prevState, Vegetarian: true}});
             }}          
           >Vegetarian</div>
           <div className="msg cuisine-msg"
             style={props.cuisines.American ? {backgroundColor: "#d9d9d9"} : {backgroundColor: "#f2f2f2"}}
             onClick={(e) => {
               e.stopPropagation(); 
               props.cuisines.American ? props.setCuisines(prevState => {return {...prevState, American: false}}) : props.setCuisines(prevState => {return {...prevState, American: true}});
             }}              
           >American</div>
           <div className="msg cuisine-msg"
             style={props.cuisines.French ? {backgroundColor: "#d9d9d9"} : {backgroundColor: "#f2f2f2"}}
             onClick={(e) => {
               e.stopPropagation(); 
               props.cuisines.French ? props.setCuisines(prevState => {return {...prevState, French: false}}) : props.setCuisines(prevState => {return {...prevState, French: true}});
             }}              
           >French</div>
           <div className="msg cuisine-msg"
             style={props.cuisines.Indian ? {backgroundColor: "#d9d9d9"} : {backgroundColor: "#f2f2f2"}}
             onClick={(e) => {
               e.stopPropagation(); 
               props.cuisines.Indian ? props.setCuisines(prevState => {return {...prevState, Indian: false}}) : props.setCuisines(prevState => {return {...prevState, Indian: true}});
             }}                
           >Indian</div>
           <div className="msg cuisine-msg"
             style={props.cuisines.Italian ? {backgroundColor: "#d9d9d9"} : {backgroundColor: "#f2f2f2"}}
             onClick={(e) => {
               e.stopPropagation(); 
               props.cuisines.Italian ? props.setCuisines(prevState => {return {...prevState, Italian: false}}) : props.setCuisines(prevState => {return {...prevState, Italian: true}});
             }}                
           >Italian</div>
           <div className="msg cuisine-msg"
             style={props.cuisines.Jewish ? {backgroundColor: "#d9d9d9"} : {backgroundColor: "#f2f2f2"}}
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
