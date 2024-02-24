import React, { Fragment, useState } from 'react'
import GameShop from './GameShop';

export default function Merchant({store='furniture', positionX=170, positionY=410, size=120, flip=false}) {
    const [showShop, setShowShop] = useState(false)
    //
    const merchantStyle = {
        position: 'absolute',
        left: positionX,
        top: positionY,
        maxWidth: `${size}px`,
        maxHeight: `${size}px`,

      };

  return (
    <Fragment>
        {showShop?<GameShop cat={store} closeShop={()=>setShowShop(false)}/>:null}
    <div className='merchant' style={merchantStyle} onClick={()=>setShowShop(true)}>
        <h4 className='merchantName'>{store[0].toUpperCase()+store.slice(1)} Merchant</h4>
        <img style={{maxHeight:'inherit', maxWidth:'inherit',transform:`scaleX(${flip?-1:1})`}} src={`../images/characters/${store}_merchant.png`}/>
    </div>
    </Fragment>
  )
}
