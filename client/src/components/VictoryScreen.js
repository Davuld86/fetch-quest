import React, { useContext, useState } from 'react'
import { SocketContext, UserContext } from './App'


export default function VictoryScreen({enemy, character, setCharacter,exitBattle}) {
    const [user, setUser] = useContext(UserContext)
    const socket = useContext(SocketContext)
    let lvl = false
    let n = character.level
    let diff = 0
    let threshold = 0
    let statChanges = {hp:0, mp:0, atk:0,matk:0,defense:0}
    let xpDrop = calcWithVar(enemy.exp,1,20)

    function calculateLevel(exp, level){
        while (exp >= threshold) {
            threshold = Math.round((4 * Math.pow(level, 3)) / 5);
            if (exp >= threshold){
                level++
            }
        }
        n=level-1
        return level - 1;
    }

    function calcWithVar(base, multiplier, variance=5){
        let result = base * multiplier;
        const randomVariation = Math.floor(Math.random() * variance) + 1;
        result += randomVariation;
        return result;
}
    function handleExit(){
        let ch = character
        ch ={
            ...ch,
            hp: ch.hp,
            mp: ch.mp,
            exp: ch.exp+xpDrop,
            level: n,
            max_hp: ch.max_hp + statChanges.hp,
            max_mp: ch.max_mp + statChanges.mp,
            atk: ch.atk + statChanges.atk,
            matk: ch.matk +statChanges.matk,
            defense: ch.defense + statChanges.defense,
        }
        let u = {...user, coins:user.coins+enemy.coins}
        setUser(u)
        setCharacter(ch)
        let data ={
            user_id: ch.user_id,
            coins: u.coins,
            exp: ch.exp,
            level: ch.level,
            max_hp: ch.max_hp,
            max_mp: ch.max_mp,
            atk: ch.atk,
            matk: ch.matk,
            defense: ch.defense,

        }
        socket.emit('exit_battle',data)
        exitBattle(ch, u)
    }

    if(calculateLevel(character.exp+xpDrop, character.level)> character.level){
        diff = n-character.level

        lvl=true
        statChanges={
            hp: calcWithVar(7,diff),
            mp:calcWithVar(5,diff),
            atk:calcWithVar(3,diff),
            matk:calcWithVar(3,diff),
            defense:calcWithVar(2,diff)
        }
    }

    return (
    <div className='victory'>
        <h1>Victory!</h1>
        <div style={{display:'flex'}}>
        <div>
            <h2>Experience:</h2>
            <h2>You gained: {xpDrop} xp</h2>
            <h2>Level: {n} {lvl==true?'[LEVEL UP!]':null}</h2>
            <h2>EXP: {character.exp+xpDrop}/{threshold}</h2>
            <h2>Stats:</h2>
            <h3>Max HP: {character.max_hp} {lvl? `+${statChanges.hp}`:null} </h3>
            <h3>Max MP: {character.max_mp} {lvl? `+${statChanges.mp}`:null}</h3>
            <h3>ATK: {character.atk} {lvl? `+${statChanges.atk}`:null}</h3>
            <h3>DEF: {character.defense} {lvl? `+${statChanges.defense}`:null}</h3>
            <h3>MATK: {character.matk} {lvl? `+${statChanges.matk}`:null}</h3>
        </div>
        <div>
            <h2>Loot:</h2>
            <h3>You got: {enemy.coins}🪙!</h3>
            {enemy.item_drops? enemy.item_drops.map((item)=>(<h3>{item.name}</h3>)):null}
        </div>
        </div>
        <button onClick={handleExit}>Exit</button>
    </div>
  )
}
