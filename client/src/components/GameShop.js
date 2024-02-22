import React, { useContext, useEffect, useState } from 'react'
import ShopItems from './ShopItems'

import './GameShop.css'
import { UserContext } from './App'
export default function GameShop({cat='furniture', closeShop}) {
    const[user,setUser]= useContext(UserContext)
    const[allItems, setAllItems] = useState(null)
    const[items, setItems] = useState(null)
    const[category, setCategory]= useState(cat)

    useEffect(()=>{
       fetch('/api/all_items').then((res)=>{
        if(res.ok){
            res.json().then((d)=>{setAllItems(d); setItems(d.filter((item)=> item.category==category).filter((obj, index, array) => {
                return array.findIndex(item => item.name === obj.name) === index
              }))})
        }
       })
    },[])

    function buyItem(id, price){
        if (user.coins < price){
            alert('not enough gold!')
        }
        else{
            fetch(`/api/item/${id}`,{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user_id : user.id,
                price : price,
            })
        }).then((res)=>{
            if(res.ok){
                res.json().then((d)=> setUser(d))
            }
        })
        }

    }
    if(allItems){

    return (
    <div className='gameShop'>
        <span style={{display:'flex', alignItems:'center' }}>

        <h1>{category=='battle'? 'Battle Items':category=='clothes'?'Clothes':'Furniture'} Store</h1>
        <button onClick={closeShop}>Close</button>
        </span>

        <div className='item-container'>
            {items? items.map((item)=>(<ShopItems key={item.id} buyItem={buyItem} item={item}/>)):null}
        </div>
    </div>
  )
    }
}
