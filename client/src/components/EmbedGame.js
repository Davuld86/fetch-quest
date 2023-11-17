import React from 'react'

export default function EmbedGame({source}) {
  return (
    <div>
        <iframe
        src={source}
        height ='100%'
        width ='100%'
        allowFullScreen
        scrolling='no'
        >
        </iframe>
    </div>
  )
}
