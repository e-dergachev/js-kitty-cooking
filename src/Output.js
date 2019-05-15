import React from 'react';
import './output.css';

function Output(props) {
    return (
     <div id ="output">
        {props.input}
     </div>
    )
 }

 export default Output;