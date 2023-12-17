import React, { useContext, useEffect, useState } from 'react'
import ShopItems from './ShopItems'

import './Shop.css'
import { UserContext } from './App'
export default function Shop() {
    const[user,setUser]= useContext(UserContext)
    const[allItems, setAllItems] = useState(null)
    const[items, setItems] = useState(null)
    const[category, setCategory]= useState('battle')

    useEffect(()=>{
       fetch('/api/all_items').then((res)=>{
        if(res.ok){
            res.json().then((d)=>{setAllItems(d); setItems(d.filter((item)=> item.category==category))})
        }
       })
    },[])
    function filterItems(category){
        setCategory(category)
        let temp = allItems.filter((item)=> item.category== category)
        setItems(temp)
        console.log(category)
    }
    function buyItem(id, price){
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
    if(allItems){

    return (
    <div>
        <h1>Bandit's Bazaar</h1>
        <div className='shop-buttons'>
            <button value={'battle'} onClick={(e)=>filterItems(e.target.value)}>Battle-Items</button>
            <button value={'clothes'} onClick={(e)=>filterItems(e.target.value)}>Clothing</button>
            <button value={'furniture'} onClick={(e)=>filterItems(e.target.value)}>Furiture</button>
        </div>
        <h2>{category=='battle'? 'Battle Items':category=='clothes'?'Clothes':'Furniture'}</h2>
        <div className='item-container'>
            {items? items.map((item)=>(<ShopItems buyItem={buyItem} item={item}/>)):null}
        </div>
    </div>
  )
    }
}
