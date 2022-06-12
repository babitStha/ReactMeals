import CartContext from "./cart-context"
import { useReducer } from "react"

const defaultCartState = {
  items:[],
  totalAmount:0,
}
const cartReducer=(state, action)=>{

  if(action.type === "ADD"){
      const updatedTotalAmount = state.totalAmount  + action.item.price * action.item.amount
      const existingCartItemIndex =state.items.findIndex(
        item=> item.id === action.item.id
        )
      const existingCartItem = state.items[existingCartItemIndex]

      let updatedItems
      if(existingCartItem){
        let updatedItem
        updatedItem = {
          ...existingCartItem,
          amount: action.item.amount+existingCartItem.amount,
        }
        updatedItems = [...state.items]
        updatedItems[existingCartItemIndex] = updatedItem
      }else{

        updatedItems = state.items.concat(action.item)
      }
      return(
        {
          items : updatedItems,
          totalAmount : updatedTotalAmount,
        }
      )}
      if(action.type === "REMOVE"){
        const existingCartItemIndex =state.items.findIndex(
          item => item.id === action.id
          )
          const existingCartItem = state.items[existingCartItemIndex]
          const updatedTotalAmount = state.totalAmount  - existingCartItem.price
          let updatedItems 
          if(existingCartItem.amount === 1){
            updatedItems = state.items.filter(item => item.id !== action.id)
          }else{
             
            const updatedItem = {...existingCartItem, amount:existingCartItem.amount-1}
            updatedItems = [...state.items]
            updatedItems[existingCartItemIndex] = updatedItem
          }
      return(
        {
          items : updatedItems,
          totalAmount : updatedTotalAmount,
        }
      )
      }

  return defaultCartState
}

const CartProvider = props => {
  const [cartState, dispatchCartState] = useReducer(cartReducer,defaultCartState)
    const addItemHandler =(item)=>{
      dispatchCartState({item:item, type:"ADD"})
    }

    const removeItemHandler =(id)=>{
      dispatchCartState({id:id, type:"REMOVE"})
    }

    const cartContext = {
        items:cartState.items,
        totalAmount:cartState.totalAmount,
        addItem: addItemHandler,
        removeItem:removeItemHandler,
    }
  return (
    <CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>
  )
}

export default CartProvider