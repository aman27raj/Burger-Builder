import React from 'react'
import './BuildControls.css'
import BuildControl from './BuildControl/BuildControl'
const controls=[
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Meat', type: 'meat'},
    {label: 'Cheese', type: 'cheese'}
]

const BuildControls = (props) => {

  return (
    <div className='BuildControls'>
      <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
      {controls.map(ctrl=>(
          <BuildControl key={ctrl.label} label={ctrl.label} added={()=>props.added(ctrl.type)} removed={()=>props.removed(ctrl.type)} disabled={props.disabled[ctrl.type]}/>
      ))}
      <button className='OrderButton' disabled={!props.purchasable} onClick={props.ordered}>ORDER NOW</button>
    </div>
  )
}

export default BuildControls
