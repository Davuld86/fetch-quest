import React, { useEffect, useState } from 'react'
import GameCharacter from './GameCharacter';
import './Game.css'

export default function Game({char, setChar, area ='plaza'}) {
    const [characterPosition, setCharacterPosition] = useState({ x: char.x, y: char.y })
    const [show, setShow] = useState(true)
    const [textInput, setTextInput] = useState('');
    const [displayedText, setDisplayedText] = useState('');


    useEffect(() => {
      if (displayedText) {
        const timer = setTimeout(() => {
          setDisplayedText('');
        }, 3000);
        return () => clearTimeout(timer);
      }
    }, [displayedText])


    function handleCanvasClick(event){
      const x = event.clientX - 75;
      const y = event.clientY - 25;
      setCharacterPosition({x, y})
      setChar({
        ...char,
        x:characterPosition.x,
        y:characterPosition.y,
        area: area
      })
    }

    function censor(text){

    }

    function handleInputChange(event){
      setTextInput(event.target.value);
    }

    function handleInputSubmit(){

      setDisplayedText(textInput);
      setTextInput('');
    }

    return (
        <div style={{display:'grid', justifyContent:'center', overflow:'hidden'}}>
        <canvas
          onClick={handleCanvasClick}
          className="game-canvas"
          width={1500}
          height={720}
          style={{ backgroundImage: `url(../images/areas/${area==''?'plaza':area}.png)`, backgroundSize: 'cover' }}
        ></canvas>
        <GameCharacter position={characterPosition} message={displayedText} show ={show}/>
        <div className='message-box' style={{ position: 'absolute', bottom: '0', left: '50%', transform: 'translateX(-50%)' }}>
          <form onSubmit={(e)=>{e.preventDefault(); handleInputSubmit()}}>
          <input
          type="text" value={textInput} onChange={handleInputChange} placeholder="Type here..."  className="text-input"  maxLength='140'
          style={{ padding: '8px', marginRight: '8px' }}
            />
          <button type='submit' className="submit-button">🗨️</button>
          </form>
        </div>
      </div>
    )
}
