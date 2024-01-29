import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from './App'
import Loading from './Loading'

import './TreeHouse.css'
import TreeMenu from './TreeMenu'

export default function TreeHouse() {
  const [user, setUser] = useContext(UserContext)
  const [loading, setLoading] = useState(true)
  const [owner, setOwner] = useState(null)
  const [house, setHouse] =useState(null)
  const [select, setSelect] =useState(null)
  const [menuItems, setMenuItems] = useState(null)
  const [menuToggle, setMenuToggle]= useState(false)
  const ownerId = window.location.pathname.slice(6)
  let items = menuItems

  useEffect(()=>{
    fetch(`/api/user/${ownerId}`)
        .then((res)=>{
            if(res.ok){
                res.json().then((d)=>{setOwner(d); setHouse(d.base[0])})
            }
            else{
                setOwner(null)
            }
        }).then(setLoading(false))
  }, [])

  function setItems(type){
    const ownerInventory = owner.inventory.filter((item)=> (item.furn_type == type && item.id != (house[select]? house[select].id: null)))
    items = ownerInventory
    setMenuItems(()=>ownerInventory)
  }

  function placeFurniture(furniture){
    let copy = house
    let sid = `${select}_id`
    console.log(select,furniture)
    if(furniture=='none'){
      copy[`${select}`]= null
    }
    else{
      copy[`${select}`]= furniture
    }
    setHouse(copy)
    fetch(`/api/treehouse/${ownerId}`,{
      method: 'PATCH',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        [sid]: furniture.id
      })
    }
    ).then((res)=>{
      if(res.ok){
        console.log('house changed')
      }
    })
  }

  function setCategory(category){
    let beh = select
    switch (category) {
      case 'rug':
        beh= 'rug'
        break;
      case 'wall':
        beh='wall'
        break;
      case 'furn1':
        beh='furniture_1'
        break;
      case 'furn2':
        beh='furniture_2'
        break;
      case 'furn3':
        beh='furniture_3'
        break;
    }
    setSelect((prev)=> prev=beh)
  }

  if(loading){
    return(
        <Loading/>
    )
  }
  if (owner){
    if(ownerId == user.id){

      return (
            <div className='housePage'>
                <h2> Your Treehouse</h2>
                {menuToggle?<TreeMenu placeFurniture={placeFurniture} title={select} items={items} closeMenu = {setMenuToggle} setMenuToggle={setMenuToggle}/>:null}
                <img className='treehouse' src='../images/house.png'/>
                <img className='rug' src={house.rug?house.rug.image:'../images/box.png'} onClick={(e)=>{setMenuToggle(true); setItems('rug'); setCategory(e.target.className)}}/>
                <img className='wall' src={house.wall? house.wall.image:'../images/box.png'} onClick={(e)=>{setMenuToggle(true); setItems('wall'); setCategory(e.target.className)}}/>
                <img className='furn1' src={house.furniture_1? house.furniture_1.image:'../images/box.png'} onClick={(e)=>{setMenuToggle(true); setItems('furniture'); setCategory(e.target.className)}}/>
                <img className='furn2' src={house.furniture_2? house.furniture_2.image:'../images/box.png'} onClick={(e)=>{setMenuToggle(true); setItems('furniture'); setCategory(e.target.className)}}/>
                <img className='furn3' src={house.furniture_3? house.furniture_3.image:'../images/box.png'} onClick={(e)=>{setMenuToggle(true); setItems('furniture'); setCategory(e.target.className)}}/>
            </div>
          )
    }

    else{
      return(
          <div>
              <h2>{owner.username}'s Treehouse</h2>
                  {menuToggle?<TreeMenu setMenuToggle={setMenuToggle}/>:null}
                  <img className='treehouse' src='../images/house.png'/>
          </div>
      )
    }
  }


}
