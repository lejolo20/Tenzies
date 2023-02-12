import React from 'react'
import './Die.css'

export default function Die(props){
    
        const styles = {
        backgroundColor: props.isHeld ? 'green' : 'white' }


    return(
    <div>
        
        <div className='die-face' style={styles} onClick={props.holdDice}>
            {props.isHeld ?
            <img src={`./Images/Selected/img${props.value}Selected.png`}/>
            :
            <img src={`./Images/img${props.value}.png`}/>
            }
            {/* <div className='hide'>{props.value}</div> */}
        </div>
    </div>
)}