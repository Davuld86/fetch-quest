import React, { Fragment, useEffect, useState } from 'react'

export default function Inbox({chat, setBox}) {
  const [data, setData] = useState({pfp:'../images/def_pfp.png', recentMsg:''})
  useEffect(()=>{
    fetch(`/api/user/${chat.id}`)
    .then((res)=>{
      if(res.ok){
        res.json().then((d)=>{
          setData({pfp:d.pfp,recentMsg:''})})
      }
    })
 },[])
  return (
    <div className='inbox' onClick={()=>setBox({name:chat.username, id:chat.id})}>
    <div style={{display:'flex'}}>
       <img src={data.pfp}/>
    <h4>{chat.username}</h4>
    </div>
    <p style={{marginTop:'-2px', marginBottom:'3px'}}>{data.recentMsg.length<=19?data.recentMsg:data.recentMsg.slice(0,16)+'...'}</p>
    </div>
  )
}
