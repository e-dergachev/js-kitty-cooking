import React, { useState } from 'react';
import './navbar.css';

function NavBar(props) {

  const [navFolded, setNavFolded] = useState(true);
  
  const msgStyle = (cuisine) => {
    return {backgroundColor: props.cuisines[cuisine] ? props.scheme.color3 : props.scheme.color4, borderColor: props.scheme.color5}; 
  };

  const msgOnclick = (e, cuisine) => {
    e.stopPropagation(); 
    props.cuisines[cuisine] ? props.setCuisines(prevState => {return {...prevState, [cuisine]: false}}) : props.setCuisines(prevState => {return {...prevState, [cuisine]: true}});
  };

  const navBar = () => {
    if (navFolded) {
      return (
        <div id="nav-bar" style={{backgroundColor: props.scheme.color3, borderColor:props.scheme.color5, color: props.scheme.color7}} onClick={() => setNavFolded(false)} >
          <div className="msg instruction-msg">Click to select cuisines</div>
        </div>    
      );
    }
    else {
      return (
        <div id="nav-bar-unfolded" style={{backgroundColor: props.scheme.color4, borderColor: props.scheme.color5, color: props.scheme.color7}} onClick={() => setNavFolded(true)}>
          <div className="msg instruction-unfolded-msg">Click cuisines to select/unselect them, click the bar again to close it</div>
          <div className="msg cuisine-msg"
            style={msgStyle("General")}
            onClick={(e) => msgOnclick(e, "General")}
          >General</div>
          <div className="msg cuisine-msg"
            style={msgStyle("Vegetarian")}
            onClick={(e) => msgOnclick(e, "Vegetarian")}         
          >Vegetarian</div>
          <div className="msg cuisine-msg"
            style={msgStyle("American")}
            onClick={(e) => msgOnclick(e, "American")}              
          >American</div>
          <div className="msg cuisine-msg"
            style={msgStyle("French")}
            onClick={(e) => msgOnclick(e, "French")}             
          >French</div>
          <div className="msg cuisine-msg"
            style={msgStyle("Indian")}
            onClick={(e) => msgOnclick(e, "Indian")}               
          >Indian</div>
          <div className="msg cuisine-msg"
            style={msgStyle("Italian")}
            onClick={(e) => msgOnclick(e, "Italian")}               
          >Italian</div>
          <div className="msg cuisine-msg"
            style={msgStyle("Jewish")}
            onClick={(e) => msgOnclick(e, "Jewish")}               
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
