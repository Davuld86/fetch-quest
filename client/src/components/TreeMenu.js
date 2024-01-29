import React from 'react'
import TreeItem from './TreeItem'

export default function TreeMenu({items,setMenuToggle, placeFurniture, closeMenu, title}) {
  return (
    <div className='treeMenu'>
        <button onClick={()=>setMenuToggle(false)}>Close</button>
        <h3 style={{display:'flex', justifyContent:'center'}}>{title}</h3>
        <div className='furnitureItems'>

            {items.map((item)=>(<TreeItem item={item} placeFurniture={placeFurniture} closeMenu={closeMenu}/>))}

            <div className='furniture-item' onClick={()=>{placeFurniture('none'); closeMenu(false)}}>
            <h5>Remove</h5>
            <img src={'../images/none.png'}/>
            </div>

        </div>
    </div>
  )
}
