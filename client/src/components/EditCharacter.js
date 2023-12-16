import React, { Fragment, useContext, useEffect, useState } from 'react'
import CharacterImage from './CharacterImage'
import { UserContext } from './App'
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min'
import ColorCharacter from './ColorCharacter'
import { desc, stat } from './descriptions'

import './EditCharacter.css'
export default function EditCharacter() {

    const [user,setUser] = useContext(UserContext)
    const page_id = window.location.pathname.slice(16)
    const [char, setChar] = useState(null)
    const [color, setColor] = useState(null)
    const [job, setJob] = useState(null)
    const [loading, setLoading] = useState(true)
    const [submitted, setSubmit] = useState(false)
    const col ={'red':'1','orange':'2','yellow':'3','green':'4', 'blue':'5', 'indigo':'6', 'violet':'7'}

    useEffect(()=>{
        fetch(`/api/character/${user.character[0].id}`).then((res)=>{
            if(res.ok){
                res.json().then((d)=> {setChar(()=>d); setColor(()=>d.color); setJob(()=>d.job)})
            }
            else{
                setChar(0)
            }
            setLoading(false)
        })

    },[])


    function handleSubmit(){
        let ch = char
        fetch(`/api/character/${ch.id}`,{
            method:'PATCH',
            headers:{
                'Content-Type':'application/json'
            },
        body:(JSON.stringify({
            color: color,
            job: job,
            hp: ch.hp -stat[ch.job].HP + stat[job].HP,
            mp: ch.mp -stat[ch.job].MP  + stat[job].MP,
            atk: ch.atk -stat[ch.job].ATK + stat[job].ATK,
            defense: ch.defense -stat[ch.job].DEF + stat[job].DEF,
            matk: ch.matk -stat[ch.job].MATK + stat[job].MATK
        }))
    }).then((res)=>{
        if (res.ok){
            setSubmit(true)
        }
    })
    }

    function setName(stat, num){
        if (num>char[stat]){
            return 'positive'
        }
        if(num<char[stat]){
            return 'negative'
        }
        else{
            return 'neutral'
        }
    }

    function math(stat, num){
        let sum = num-char[stat]
        if(sum>=0){
           return ('+'+sum)
        }
         return num-char[stat]

    }

if(loading){
        return <h1>loading...</h1>
}

if(submitted){
    return <Redirect to='/'/>
}


else if(char){
    let c = char
    if (user.id != page_id ){
        return <Redirect to={`/edit-character/${user.id}`}/>
    }
    else{

    }
    return (
        <div>
        <div className='edit-character-page'>
            <div className='character'>
            <h2>Change Color</h2>
            <ColorCharacter job={job} setColor={setColor} start={col[color]}/>
            <br/>
            <h2>Change Job:</h2>
            <div className='job-buttons'>
            <button value={'thief'} onClick={(e)=> {setJob(e.target.value);}}>Theif</button>
            <button value={'swordsman'} onClick={(e)=> {setJob(e.target.value);}}>Swordsman</button>
            <button value={'wizard'} onClick={(e)=> {setJob(e.target.value);}}>Wizard</button>
            <button value={'archer'} onClick={(e)=> {setJob(e.target.value);}}>Archer</button>
            </div>
            </div>
            <div className='job-description'>
                <h1>The {job.charAt(0).toUpperCase() + job.substr(1).toLowerCase()}:</h1>
                <p>{desc[job]}</p>

                <div className='stat' style={{display:'flex'}}>

                <div>
                    <h2>Stat Changes</h2>
                    <div className='stat'>
                        <h3 className={setName('hp', c.hp -stat[c.job].HP + stat[job].HP)}>
                            HP: {c.hp -stat[c.job].HP + stat[job].HP}</h3>
                        <h3>({math('hp',c.hp -stat[c.job].HP + stat[job].HP)})</h3>
                    </div>

                    <div className='stat'>
                    <h3 className={setName('mp', c.mp -stat[c.job].MP + stat[job].MP)}>
                            MP: {c.mp -stat[c.job].MP  + stat[job].MP}</h3>
                         <h3>({math('mp',c.mp -stat[c.job].MP  + stat[job].MP)})</h3>
                         </div>

                    <div className='stat'>
                        <h3 className={setName('atk',c.atk -stat[c.job].ATK + stat[job].ATK)}>
                            ATK: {c.atk -stat[c.job].ATK + stat[job].ATK}</h3>
                         <h3>({math('atk', c.atk -stat[c.job].ATK + stat[job].ATK)})</h3>
                         </div>

                    <div className='stat'>
                        <h3 className={setName('defense',c.defense -stat[c.job].DEF + stat[job].DEF)}>
                            DEF: {c.defense -stat[c.job].DEF + stat[job].DEF}</h3>
                         <h3>({math('defense',c.defense -stat[c.job].DEF + stat[job].DEF)})</h3>
                         </div>

                    <div className='stat'>
                        <h3 className={setName('matk',c.matk -stat[c.job].MATK + stat[job].MATK)}>
                            MATK: {c.matk -stat[c.job].MATK + stat[job].MATK}</h3>
                         <h3>({math('matk',c.matk -stat[c.job].MATK + stat[job].MATK)})</h3>
                         </div>
                </div>
                </div>
            </div>
        </div>
        <button onClick={()=> handleSubmit()}>Submit Changes</button>
        </div>
      )
}

}
