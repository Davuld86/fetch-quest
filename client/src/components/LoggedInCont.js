import React from 'react'

export default function LoggedInCont({user}) {

if (user){
    return(
        <div style={{display:'flex'}}>
        <h5>image</h5>
        <h5>🔽</h5>
        </div>
    )
}
else{
    return (
        <div style={{display:'flex'}}>
        <h5>image</h5>
        <h5>🔽</h5>
        </div>
      )
}

}
