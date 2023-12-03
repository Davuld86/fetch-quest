import React from 'react'

export default function EmbedGame({source}) {
  return (
        <iframe
        src={source}
        allowFullScreen
        scrolling='no'
        frameborder="0"
        >
        </iframe>
  )
}
