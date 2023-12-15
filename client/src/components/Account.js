import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from './App'
import NotFound from './NotFound'
import CharacterContainer from './CharacterContainer'
import { Link, useLocation } from 'react-router-dom/cjs/react-router-dom.min'

import './Account.css'
export default function Account() {
    const [user, setUser] = useContext(UserContext)
    const [isLoading, setLoading] = useState(true)
    const [pageUser, setPageUser] = useState(0)
    const location = useLocation()

    useEffect(()=>{
        fetch(`/api/user/${window.location.pathname.slice(9)}`)
        .then((res)=>{
            if(res.ok){
                res.json().then((d)=>setPageUser(d))
            }
            else{
                setPageUser(null)
            }
            setLoading(false)
        })

    },[location])


    if(isLoading){
        return <h1>loading...</h1>
    }
    else{
        if (pageUser){
            console.log(pageUser.character[0])
            return (
                <div>
                    <h1>User: {pageUser.username}</h1>
                    <img src={`${pageUser.pfp}`} className='user-pfp'/>
                    <h3>Bio:</h3>
                    <p>{pageUser.bio}</p>
                      <div style={{display:'flex'}}>
                    <Link to={`/base/${pageUser.id}`}><button>Go to Treehouse</button></Link>
                    {user.id!= pageUser.id?<Link to={'/messages'}><button>Message</button></Link>:null}
                    {user.id==pageUser.id?<Link to={`/account-settings/${user.id}`}><button>Edit Account</button></Link>:null}
                    </div>
                    <h2>Character</h2>
                    <CharacterContainer character={pageUser.character[0]}/>

                </div>
              )
        }

        return <NotFound title={'No user here!'} text={'This user does not exist'}/>
    }

}
