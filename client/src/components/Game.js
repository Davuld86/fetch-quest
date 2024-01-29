import React, { useEffect, useState } from 'react'
import GameCharacter from './GameCharacter';

import './Game.css'
import OWEnemy from './OWEnemy';
import { startBattle } from './helpers';
export default function Game() {
    const [characterPosition, setCharacterPosition] = useState({ x: 0, y: 0 });
    const [textInput, setTextInput] = useState('');
    const [displayedText, setDisplayedText] = useState('');
    const [showBattle, setShowBattle] = useState(false);

    useEffect(() => {
      if (displayedText) {
        const timer = setTimeout(() => {
          setDisplayedText('');
        }, 3000);
        return () => clearTimeout(timer);
      }
    }, [displayedText]);

    const handleCanvasClick = (event) => {
      const canvas = event.target;
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      setCharacterPosition({x, y});
    };

    const handleInputChange = (event) => {
      setTextInput(event.target.value);
    };

    const handleInputSubmit = () => {
      setDisplayedText(textInput);
      setTextInput('');
    };

    return (
        <div style={{display:'grid', justifyContent:'center'}}>
        <canvas
          onClick={handleCanvasClick}
          className="game-canvas"
          width={1080}
          height={720}
          style={{ backgroundImage: `url('./path/to/background/image.jpg')`, backgroundSize: 'cover' }}
        ></canvas>
        <GameCharacter position={characterPosition} message={displayedText} />
        <OWEnemy positionX={850} positionY={600} startBattle={startBattle} />
        <div className='message-box' style={{ position: 'absolute', bottom: '0', left: '50%', transform: 'translateX(-50%)' }}>
          <form onSubmit={(e)=>{e.preventDefault(); handleInputSubmit()}}>
          <input
            type="text"
            value={textInput}
            onChange={handleInputChange}
            placeholder="Type here..."
            className="text-input"
            style={{ padding: '8px', marginRight: '8px' }}
          />
          <button type='submit' className="submit-button">🗨️</button>
          </form>
        </div>
      </div>
    );
}
