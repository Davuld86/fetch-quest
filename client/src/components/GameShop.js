import React, { Fragment, useContext, useEffect, useState } from 'react'
import ShopItems from './ShopItems'

import './GameShop.css'
import { UserContext } from './App'
import AlertBox from './AlertBox'
export default function GameShop({cat='furniture', closeShop}) {
    const[user,setUser]= useContext(UserContext)
    const[allItems, setAllItems] = useState(null)
    const[items, setItems] = useState(null)
    const[category, setCategory]= useState(cat)
    const [showBox, setShowBox] = useState(false)
    const [color, setColor] = useState('green')
    const [message, setMessage] = useState('')


    useEffect(()=>{
       fetch('/api/all_items').then((res)=>{
        if(res.ok){
            res.json().then((d)=>{setAllItems(d); setItems(d.filter((item)=> item.category==category).filter((obj, index, array) => {
                return array.findIndex(item => item.name === obj.name) === index
              }))})
        }
       })
    },[])

    function buyItem(item){
        if (user.coins < item.price){
            setMessage('Not enough gold!')
            setColor('red')
            setShowBox(true)
        }
        else{
            fetch(`/api/item/${item.id}`,{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user_id : user.id,
                price : item.price,
            })
        }).then((res)=>{
            if(res.ok){
                res.json().then((d)=> setUser(d))
                setMessage(`You bought a ${item.name}`)
                setColor('green')
                setShowBox(true)
            }
        })
        }

    }

    if(showBox){
        setTimeout(() => {
          setShowBox(false);
        }, 3000);
      }


    if(allItems){

    return (
    <Fragment>
        {showBox?<AlertBox color={color} message={message}/>:null}
    <div className='gameShop'>
        <span style={{display:'flex', alignItems:'center' }}>

        <h1>{category=='battle'? 'Battle Items':category=='clothes'?'Clothes':'Furniture'} Store</h1>
        <button onClick={closeShop}>Close</button>
        </span>
        <div className='item-container'>

            {items? items.map((item)=>(<ShopItems key={item.id} buyItem={buyItem} item={item}/>)):null}
        </div>
    </div>
    </Fragment>
  )
    }
}
