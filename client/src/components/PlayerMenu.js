import React from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'

export default function PlayerMenu({user,setShowMenu}) {


     return (
    <div className='player-menu'>
        <button onClick={()=>setShowMenu(false)}>X</button>
        <Link to={`/account/${user.id}`}><button>View Profile</button></Link>
        <Link to={`/base/${user.id}`}><button>View TreeHouse</button></Link>
    </div>
  )
}
