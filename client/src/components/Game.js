import React, { useContext, useEffect, useState } from 'react'
import GameCharacter from './GameCharacter';
import './Game.css'
import { SocketContext } from './App';
import Player from './Player';

export default function Game({char, setChar, area ='plaza'}) {
    const socket = useContext(SocketContext)
    const [characterPosition, setCharacterPosition] = useState({ x: char.x, y: char.y })
    const [flip, setFlip] = useState(false)
    const [show, setShow] = useState(true)
    const [textInput, setTextInput] = useState('');
    const [displayedText, setDisplayedText] = useState('');

    const [loaded, setLoaded] = useState(false)
    const [players, setPlayers] = useState([])
    const [chats, setChat] = useState([])

    let Filter = require('bad-words')
    let filter = new Filter()

    useEffect(()=>{
      socket.emit('join_server', {user_id:char.user_id})
    },[])

    useEffect(()=>{
      fetch('/api/server_status').then((res)=>{
        if(res.ok){
          res.json()
          .then((d)=>setPlayers(d.filter((player)=>player.user.character[0].area===area&& player.user.id!=char.user_id)))
          .then(setLoaded(true))
        }
    })
    },[])

    useEffect(()=>{
      socket.on('join_server',(data) => {
        setPlayers([...players,data])
      })

      socket.on('leave_server',(data) => {
        console.log(data)
      })

      socket.on('all_chat', (data)=>{

        setChat([...chats,data])

      })

      socket.on('moved', (data)=>{
        let p = players.filter((player)=> player.user.id!=data.user.id && player.user.id!=char.user_id)
        let d = [...p, data]
        if(data.user.id != char.user_id){
          setPlayers(d.filter((player)=>player.user.character[0].area===area&& player.user.id!=char.user_id))
        }
      })

      return () => {
        socket.off("data", () => {
          console.log("data event was removed");
        })
      }
    },[socket, displayedText, players])

    //all chat message handling
    useEffect(() => {
      if (displayedText) {
        const timer = setTimeout(() => {
          setDisplayedText('');
        }, 3000);
        return () => clearTimeout(timer);
      }
    }, [displayedText])

    useEffect(() => {
      if (chats[0]) {
        const timer = setTimeout(() => {
          setChat(chats.slice(1));
        }, 3000);
        return () => clearTimeout(timer);
      }
    }, [chats])

    useEffect(()=>{},[players])

    function handleInputSubmit(){
      if(textInput!=''){
        let txt = textInput
        try{
          txt = filter.clean(textInput)
          setDisplayedText(filter.clean(textInput.toString()))
          setTextInput('')
        }
        catch{
          setDisplayedText(textInput.toString())
          setTextInput('')
        }

        socket.emit('all_chat',{id: char.user_id, message: txt})
      }
    }

//player move message handling
    function handleCanvasClick(event){
      const x = event.clientX - 75;
      const y = event.clientY - 25;
      if(x <characterPosition.x){
        setFlip(true)
      }
      else if(x>characterPosition.x){
        setFlip(false)
      }
      setCharacterPosition({x, y})
      setChar({
        ...char,
        x:characterPosition.x,
        y:characterPosition.y,
        area: area
      })
      socket.emit('move',{user_id:char.user_id, x: x, y: y,area:area})
    }

    function handleInputChange(event){
      setTextInput(event.target.value);
    }



    return (
        <div style={{display:'grid', justifyContent:'center', overflow:'hidden'}}>
        <canvas
          onClick={handleCanvasClick}
          className="game-canvas"
          width={1500}
          height={720}
          style={{backgroundImage: `url(../images/areas/${area==''?'plaza':area}.png)`, backgroundSize: 'cover' }}
        ></canvas>

        <GameCharacter position={characterPosition} message={displayedText} show ={show} flip={flip}/>
        {players&&loaded?players.map((player)=><Player key={player.id} player={player} chat={chats} setChat={setChat} />):null}

        <div className='message-box' style={{ position: 'absolute', bottom: '0', left: '50%', transform: 'translateX(-50%)', zIndex:'11' }}>
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
