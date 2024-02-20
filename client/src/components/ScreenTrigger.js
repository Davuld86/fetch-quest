import React from 'react'
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min'

export default function ScreenTrigger({link,width, height,x, y, char, setChar, xPos, yPos}) {
    let history = useHistory()

    function moveTo(){
        history.push(link)
        let c = {
            ...char,
            x:xPos,
            y:yPos,
        }
        setChar(c)
    }

    if ( char.x > x +width||
        char.x+50 < x ||
        char.y > y +height||
        char.y+50  < y
      )
      {

      }
      else{
        return(history.push(link))
      }

    return (
    <div onClick={moveTo}
    style={{
      position: 'absolute',
      top: `${y}px`,
      left: `${x}px`,
      width: `${width}px`,
      height: `${height}px`,
      backgroundColor:'blue'
    }}
    >

    </div>

  )
}
