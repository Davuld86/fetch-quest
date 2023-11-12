import React, { Component } from 'react'
import GameContainer from './GameContainer'

export default class Home extends Component {
  render() {

    return (
      <div>
        <h1>Home</h1>
        <h3>New</h3>
        <GameContainer/>
        <h3>Popular</h3>
        <GameContainer/>
        <h3>Random</h3>
        <GameContainer/>
      </div>
    )
  }
}

