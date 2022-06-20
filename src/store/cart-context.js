import React from "react";

const CartContext =React.createContext({
    items:[],
    totalAmount:0,
    addItem: (item)=>{},
    removeItem:(id)=>{},
    resetCart: ()=>{},
}) 
export default CartContext