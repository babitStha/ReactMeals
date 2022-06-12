import {useContext} from 'react'
import classes from './Cart.module.css'
import Modal from '../Layout/Modal'
import CartContext from '../../store/cart-context'
import CartItem from './CartItem'
const Cart = (props) => {
    const cartCntx = useContext(CartContext)
    const onRemoveHandler = id =>{
        cartCntx.removeItem(id)
    }
    const onAddHandler = item => {
        cartCntx.addItem({...item, amount:1})
    }
    const cartItems = (<ul className={classes['cart-items']}>{cartCntx.items.map(item=>{
        return <CartItem key={item.id} name={item.name} summary={item.description} price={item.price} amount={item.amount} onAdd= {onAddHandler.bind(null, item)} onRemove={onRemoveHandler.bind(null, item.id)} />
    })}</ul>)
  return (
    <Modal onClick={props.onClick}>
        {cartItems}
        <div className={classes.total}>
            <span>Total Amount</span>
            <span>{`$${cartCntx.totalAmount.toFixed(2)}`}</span>
        </div>
        <div className={classes.actions}>
            <button className={classes['button--alt']} onClick={props.onClick}>
                Close
            </button>
            <button className={classes.button}>Order 
            </button>
        </div>
    </Modal>
  )
}

export default Cart