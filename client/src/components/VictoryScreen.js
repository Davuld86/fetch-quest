import React, { useContext, useState } from 'react'
import { UserContext } from './App'

export default function VictoryScreen({enemy, character, setCharacter,exitBattle}) {
    const [user, setUser] = useContext(UserContext)
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
        setCharacter({
            ...character,
            exp: character.exp+xpDrop,
            level: n,
            max_hp: character.max_hp + statChanges.hp,
            max_mp: character.max_mp + statChanges.mp,
            atk: character.atk + statChanges.atk,
            matk: character.matk +statChanges.matk,
            defense: character.defense + statChanges.defense,
        })
        setUser({...user, coins:user.coins+enemy.coins})
        exitBattle()
    }

    if(calculateLevel(character.exp+xpDrop, character.level)> character.level){
        diff = n-character.level
        lvl = true

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
            <h2>You gained: {xpDrop} XP</h2>
            <h2>Level: {n} {lvl?'[LEVEL UP!]':null}</h2>
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
