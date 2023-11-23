import React, { Fragment, useState } from 'react'
import UserMenu from './UserMenu'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'

export default function LoggedUser({user, handleLogOut}) {
  const [menuActive, toggleMenu] = useState(false)
    return (
    <Fragment>
    <div style={{display:'flex', justifyContent: 'flex-end', alignContent: 'center'}}>
       <Link to='/upload-game/'> <h4 title='upload game'>🔼</h4> </Link>
        <h4 title='View Favorites'>❤️</h4>
        <img onClick={()=>toggleMenu((pos)=>(!pos))} src={user.pfp} style= {{cursor:'pointer',maxWidth:'50px', height:'50px', borderRadius:'50%', objectFit:'cover'}}></img>
    </div>
    { !menuActive? null: <UserMenu handleLogOut={handleLogOut} toggleMenu={toggleMenu} user={user}/>}
    </Fragment>
  )
}
