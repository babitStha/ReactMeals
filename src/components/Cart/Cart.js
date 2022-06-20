import React, { useContext, useState } from 'react'
import classes from './Cart.module.css'
import Modal from '../Layout/Modal'
import CartContext from '../../store/cart-context'
import CartItem from './CartItem'
import Checkout from './Checkout'
const Cart = (props) => {
    const [displayCheckout, setDisplayCheckout] = useState(false)
    const [isCartSubmitting, setIsCartSubmitting] = useState(false)
    const [isCartSubmitted, setIsCartSubmitted] = useState(false)
    const [submitError, setSubmitError] = useState(false)
    const cartCntx = useContext(CartContext)
    const onRemoveHandler = id => {
        cartCntx.removeItem(id)
    }
    const onAddHandler = item => {
        cartCntx.addItem({ ...item, amount: 1 })
    }
    const checkoutHandler = () => setDisplayCheckout(true)
    const cartItems = (<ul className={classes['cart-items']}>{cartCntx.items.map(item => {
        return <CartItem key={item.id} name={item.name} summary={item.description} price={item.price} amount={item.amount} onAdd={onAddHandler.bind(null, item)} onRemove={onRemoveHandler.bind(null, item.id)} />
    })}</ul>)

    const onSubmit = async (data) => {
        setIsCartSubmitting(true)
        try {
            const response = await fetch('https://learnreact-f4053-default-rtdb.firebaseio.com/orders.json', {
                method: "POST",
                body: JSON.stringify({
                    checkoutData: { ...data },
                    orderItems: cartCntx.items
                })
            })
            if (!response.ok) {
                throw new Error('Something went Wrong!. Process order failed.')
            }
            const reply = await response.json()
            // cartCntx.resetCart()
            console.log(reply)
        } catch (err) {
            setSubmitError(true)
            console.log(err.message)
        }
        setIsCartSubmitting(false)
        setIsCartSubmitted(true)
    }

    const cartModelContext = <React.Fragment>
        {cartItems}
        <div className={classes.total}>
            <span>Total Amount</span>
            <span>{`$${cartCntx.totalAmount.toFixed(2)}`}</span>
        </div>
        {displayCheckout ? <Checkout onSubmit={onSubmit} />
            : (<div className={classes.actions}>
                <button className={classes['button--alt']} onClick={props.onClick}>
                    Close
                </button>
                <button className={classes.button} onClick={checkoutHandler}>Order
                </button>
            </div>)}
    </React.Fragment>
    return (
        <Modal onClick={props.onClick}>
            {!isCartSubmitted && !isCartSubmitting && !submitError && cartModelContext }
            {isCartSubmitting && <p>Submitting</p>}
            {submitError && <p>Failed to place Order.</p>}
            {isCartSubmitted && !isCartSubmitting && !submitError && <p> Your Order has been Placed</p> }
        </Modal>
    )
}

export default Cart