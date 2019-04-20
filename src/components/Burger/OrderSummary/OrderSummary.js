import React from 'react'
import Aux from '../../../hoc/Aux'
const OrderSummary = (props) => {
  const ingredientSummary = Object.keys(props.ingredients)
                            .map(igkey=>{
                                return <li key={igkey}>{igkey}: {props.ingredients[igkey]}</li>
                            })   
  return (
    <Aux>
        <h3>Your Order</h3>
        <p>
            A delicious burger with the following ingredients:
        </p>
        <ul>
            {ingredientSummary}
        </ul>
        <h4>Total Price: {props.totalPrice.toFixed(2)}</h4>
        <p>Continue to Checkout?</p>
        <button onClick={props.cancelClicked}>CANCEL</button>
        <button onClick={props.continueClicked}>CONTINUE</button>
    </Aux>
  )
}

export default OrderSummary
