import React, { Fragment, useEffect, useState } from 'react'

export default function Inbox({chat, setBox, removeBox}) {
  const [data, setData] = useState({pfp:'../images/def_pfp.png',recentMsg:'',username:'User'})

  useEffect(()=>{
    fetch(`/api/user/${chat.owner_id}`)
    .then((res)=>{
      if(res.ok){
        res.json().then((d)=>{
          setData({pfp:d.pfp,recentMsg:'',username:d.username})})
      }
    })
 },[])
  return (
    <div className='inbox'>
    <div onClick={()=>setBox(chat)} style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
       <img src={data.pfp}/>
    <h4>{data.username}</h4>
    <button style={{height:'25px', marginRight:'5px'}} onClick={()=>removeBox(chat.owner_id)}>X</button>
    </div>
    <p style={{marginTop:'-2px', marginBottom:'3px'}}>{data.recentMsg.length<=19?data.recentMsg:data.recentMsg.slice(0,16)+'...'}</p>
    </div>
  )
}
