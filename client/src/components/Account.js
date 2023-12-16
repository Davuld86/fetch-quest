import React, { Fragment, useContext, useEffect, useState } from 'react'
import { UserContext } from './App'
import NotFound from './NotFound'
import CharacterContainer from './CharacterContainer'
import { Link, useLocation } from 'react-router-dom/cjs/react-router-dom.min'

import './Account.css'
export default function Account() {
    const [user, setUser] = useContext(UserContext)
    const [isLoading, setLoading] = useState(true)
    const [pageUser, setPageUser] = useState(0)
    const [stat, setStatus]= useState('Add Friend')
    const location = useLocation()

    useEffect(()=>{
        fetch(`/api/user/${window.location.pathname.slice(9)}`)
        .then((res)=>{
            if(res.ok){
                res.json().then((d)=>setPageUser(d) )
            }
            else{
                setPageUser(null)
            }

        }).then(()=>{
            if(user){
            fetch(`/api/friends/${user.id}`).then((res)=>{
                res.json().then((d)=>{
                    let f = d.filter((friend)=> friend.user_id_1 ==pageUser.id || friend.user_id_2==pageUser.id)
                    if(f[0]){
                        setStatus(f[0])
                    }
                    else{
                        setStatus({status:'Add Friend'})
                    }
                })
            })
        }
    }).then(setLoading(false))

    },[location])



    function handleFriend(friend){
        if(friend.status=='Friends'){
            fetch(`/api/friends/${friend.id}`, {
                method:'DELETE'
            }).then(setStatus({...stat, status:'Add Friend'}))
        }
        if(friend.status=='Add Friend'){
            fetch(`/api/friends/${user.id}`,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    request: user.id,
                    friend: pageUser.id,
                })
            }).then((res)=>{
                if(res.ok){
                res.json().then((d)=> setStatus({...stat, status:d.status}))
                }
            })
        }
        else{}
    }

    if(isLoading){
        return <h1>loading...</h1>
    }

    else if (pageUser){
            return (
                <div>
                    <h1>User: {pageUser.username}</h1>
                    <img src={`${pageUser.pfp}`} className='user-pfp'/>
                    <h3>Bio:</h3>
                    <p>{pageUser.bio}</p>

                    <div style={{display:'flex'}}>
                    <Link to={`/base/${window.location.pathname.slice(9)}`}><button>Go to Treehouse</button></Link>
                   {user?
                   <Fragment>
                   {user.id!= pageUser.id?<Link to={'/messages'}><button>Message</button></Link>:null}
                    {user.id==pageUser.id?<Link to={`/account-settings/${user.id}`}><button>Edit Account</button></Link>:null}
                   {stat.status? user.id!=pageUser.id? <button value={stat} onClick={(e)=>handleFriend(stat)}>{stat.status=='Friends'?'Friends':'Pending' }</button>:null :null}
                    </Fragment>
                    :null
                    }
                    </div>
                    <h2>Character</h2>
                    {pageUser.character[0]?<CharacterContainer character={pageUser.character[0]}/>:null}
                </div>
              )
        }
    else{
        return <NotFound title={'No user here!'} text={'This user does not exist'}/>
    }


}
