import React, { Component } from 'react'

export default function NavBar(){
    return (
      <div>
        <ul style={{display:'flex',justifyContent:'space-evenly'}}>
            <p>Action</p>
            <p>Adventure</p>
            <p>Puzzle</p>
            <p>Shooting</p>
            <p>Strategy</p>
            <p>More</p>
        </ul>
      </div>
    )

}
