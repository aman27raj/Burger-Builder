import React, { Component } from 'react'
import Aux from '../../hoc/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-order'
let INGREDIENT_PRICES


class BurgerBuilder extends Component {
  state ={
    ingredients: null,
    totalPrice: 4,
    purchasable:false,
    purchasing: false,
    loading: false
  }
  componentDidMount() {
    axios.get('https://burger-builder-b0f77.firebaseio.com/ingridents.json')
          .then(response => {
              this.setState({ingredients: response.data})
          })
          .catch(error=>{
            console.log(error);
          })
          axios.get('https://burger-builder-b0f77.firebaseio.com/ingridents_price.json')
          .then(response => {
              INGREDIENT_PRICES = response.data
              console.log(INGREDIENT_PRICES)
          })
          .catch(error=>{
            console.log(error);
          })
  }

  updatePurchaseState = (ingredients)=> {
    const sum = Object.keys(ingredients)
                .map(igkey=>{
                  return ingredients[igkey];
                })
                .reduce((sum,el)=>{
                  return sum+el;
                },0)
    this.setState({
      purchasable: sum>0
    })            
  }

  addIngredientHandler = (type)=>{
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount+1;
    const updatedIngredients = {
      ...this.state.ingredients
    }  
    updatedIngredients[type]= updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({
      ingredients: updatedIngredients,
      totalPrice: newPrice
    })
    this.updatePurchaseState(updatedIngredients);
  }
  removeIngredientHandler  = (type)=>{
    let Count=this.state.ingredients[type]
    let price = INGREDIENT_PRICES[type]
    if(this.state.ingredients[type])
     {Count = this.state.ingredients[type]-1;
      price =this.state.totalPrice- INGREDIENT_PRICES[type];}
   const updatedIngredients = {
      ...this.state.ingredients
    }
    updatedIngredients[type]=Count;
    
    
    this.setState({
      ingredients: updatedIngredients,
      totalPrice:price
    })
    this.updatePurchaseState(updatedIngredients);
  }

  purchaseHandler=()=>{
    this.setState({purchasing:true})
  }
  purchaseCancelHandler = ()=>{
    this.setState({purchasing:false})
  }
  purchaseContinueHandle =()=>{
    // alert("Continue")
    this.setState({loading: true})
    const order = {
        ingredients: this.state.ingredients,
        price: this.state.totalPrice,
        customer: {
          name: 'red_john',
          address: {
            college: 'KNIT',
            pincode: '228118',
            country: 'BHARAT'
          },
          email: 'qwerty@test.com'
        },
        deliveryMethod: 'fastest'
    }
    axios.post('/orders.json',order)
         .then(response => {this.setState({loading: false, purchasing: false})})
         .catch(error => {this.setState({loading: false,purchasing:false})});
  }
  render() {
    const disabledInfo = {
      ...this.state.ingredients
    }
    for(let key in disabledInfo){
      disabledInfo[key] = disabledInfo[key]<=0
    }
    
    let orderSummary;
  
    let burger = <div>Loading....</div>

    if(this.state.ingredients){
      burger = <Aux><Burger ingredients={this.state.ingredients}/>
      <div><BuildControls 
            added={this.addIngredientHandler} 
            removed={this.removeIngredientHandler} 
            disabled={disabledInfo} 
            price={this.state.totalPrice}
            purchasable={this.state.purchasable}
            ordered={this.purchaseHandler}/></div></Aux>

      orderSummary = <OrderSummary 
            ingredients={this.state.ingredients}
            cancelClicked={this.purchaseCancelHandler}
            continueClicked={this.purchaseContinueHandle}
            totalPrice={this.state.totalPrice}/>;
    }
    if(this.state.loading){
      orderSummary = <div>Loading....</div>
    }
    return (
      <Aux>
          <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
            {orderSummary}
          </Modal>
          {burger}
      </Aux>
    )
  }
}
export default BurgerBuilder