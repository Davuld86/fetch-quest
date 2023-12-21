import React, { useEffect } from 'react'
import Battle from './Battle'

export default function PlayHome() {

  return (
    <div>
        <h1>Battle</h1>
        <div style={{display:'flex', flexDirection:'column', alignItems: 'center'}}>
        <button>Fight bat</button>
        <button>Fight spider</button>
        <button>Fight slime</button>
        <button>Fight skeleton</button>
        <button>Fight genie</button>
        <button>Fight Wood Golem</button>
        </div>

        <Battle enemy_id={2}/>
    </div>
  )
}
