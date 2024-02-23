import React, { Fragment, useContext, useEffect, useState } from 'react'
import ShopItems from './ShopItems'

import './Shop.css'
import { UserContext } from './App'
import AlertBox from './AlertBox'
export default function Shop() {
    const[user,setUser]= useContext(UserContext)
    const[allItems, setAllItems] = useState(null)
    const[items, setItems] = useState(null)
    const[category, setCategory]= useState('battle')
    const [showBox, setShowBox] = useState(false)
    const [message, setMessage] = useState('')
    const[color, setColor] = useState('green')

    useEffect(()=>{
       fetch('/api/all_items').then((res)=>{
        if(res.ok){
            res.json().then((d)=>{setAllItems(d); setItems(d.filter((item)=> item.category==category).filter((obj, index, array) => {
                return array.findIndex(item => item.name === obj.name) === index
              }))})
        }
       })
    },[])

    function filterItems(category){
        setCategory(category)
        let temp = allItems.filter((item)=> item.category== category).filter((obj, index, array) => {
            return array.findIndex(item => item.name === obj.name) === index;
          })
        setItems(temp)

    }

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
    <div className='shop'>
        {showBox?<AlertBox color={color} message={message}/>:null}
        <h1>Bandit's Bazaar</h1>
        <div className='shop-buttons'>
            <button value={'battle'} onClick={(e)=>filterItems(e.target.value)}>Battle-Items</button>
            <button value={'clothes'} onClick={(e)=>filterItems(e.target.value)}>Clothing</button>
            <button value={'furniture'} onClick={(e)=>filterItems(e.target.value)}>Furiture</button>
        </div>
        <h2>{category=='battle'? 'Battle Items':category=='clothes'?'Clothes':'Furniture'}</h2>
        <div className='item-container'>
            {items? items.map((item)=>(<ShopItems key={item.id} buyItem={buyItem} item={item}/>)):null}
        </div>
    </div>
    </Fragment>
  )
    }
}
