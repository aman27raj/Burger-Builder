import React from 'react'
import './Burger.css'
import BurgerIngerdient from './BurgerIngredient/BurgerIngredient'
const Burger = (props) => {
  let transformedIngredients = Object.keys(props.ingredients)
    .map(igkey=>{
      return [...Array(props.ingredients[igkey])].map((_,i)=>{
        return <BurgerIngerdient key={igkey+i} type={igkey}/>
      })
    })
    .reduce((arr,el)=>{
        return arr.concat(el)
    },[]);
    if(transformedIngredients.length === 0){
      transformedIngredients = <p>Start Adding ingredients</p>
    }
  return (
    <div className='Burger'>
      <BurgerIngerdient type='bread-top'/>
      {transformedIngredients}
      <BurgerIngerdient type='bread-bottom'/>
    </div>
  )
}

export default Burger
