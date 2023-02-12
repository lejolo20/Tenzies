import { useState, useEffect } from 'react'
import { useLocalStorage } from './Components/useLocalStorage'
import { v4 } from 'uuid';
import Die from './Die'
import Confetti from 'react-confetti'
import './App.css'
import './Die.css'

function App() {
  
  const [dice, setDice] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false)
  const [count, setCount] = useState(0)
  const [recordClick,setRecordClick] = useLocalStorage('count', 0)

  
  useEffect(()=>{

    const allHeld = dice.every(die=>die.isHeld)
    const firstValue = dice[0].value 
    const allSameValue = dice.every(die => die.value === firstValue) 

    if(allHeld && allSameValue){
      setTenzies(true)
      //console.log('you won')
    }
  },[dice])

  function helperDiceGenerator(){
    return(
      {
        value: Math.floor(Math.random()*6+1),
        isHeld: false,
        id: v4()
      }
    )
  }
  
  function allNewDice(){
      let diceArray = []
      for(let i=0;i<10;i++){
        diceArray.push(helperDiceGenerator())
      }
      return diceArray
  }

  //console.log(allNewDice())

  function rollDice(id){
    if(!tenzies){
      setDice(oldValue=>oldValue.map((die) =>{
        return (die.isHeld ? die : 
          helperDiceGenerator()
          )
      })) 
    } else {
      setTenzies(false)
      setDice(allNewDice())
    }
  }

  function trackNumberOfRolls(){
    (!tenzies) ? setCount(count+1) : setCount(0)
  }


  function onClickOfNumbersOfRollsandRollsDice(){
    rollDice();
    trackNumberOfRolls()
  }

  //console.log(count)

  function holdDice(id){
    setDice(oldValue=>oldValue.map(die => {
      return id===die.id ? {...die, isHeld: !die.isHeld} : die
      }))
  }

  const diceRoll = dice.map((die)=>{
    return(
      <Die key={die.id} value={die.value} isHeld={die.isHeld} holdDice={()=> holdDice(die.id)}/>
    )
  })
 
  function lowestRoll(){
    let result = 0
    if(tenzies){
      if(recordClick===0) result = setRecordClick(count)
      else if (recordClick>count) result = setRecordClick(count)
      else result = recordClick

    }
    return result
  } 

  console.log(lowestRoll())

  return (
  <main>
    {tenzies && <Confetti />}
    <div className='main-container'>
      
      <div className='dice-container'>
        <h1>Tenzies Game</h1>
        <p>Roll until all dice are the same,
          click each die to freeze it at current
          value between rolls.
        </p>
        <div className='die-container'>
          {diceRoll}
        </div>
        
        <button onClick={onClickOfNumbersOfRollsandRollsDice}>
          {tenzies ? 'New Game' : 'Roll'}
        </button>
        <div className='numberRoll'>Number Of Rolls:{count}</div>
        <div className='record'>Record of Lowest Number Of Rolls: {recordClick} </div>
      </div>
    </div>
  </main>
  )
}

export default App