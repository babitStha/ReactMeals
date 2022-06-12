import {useState, useContext, useEffect} from 'react'
import classes from './HeaderCartButton.module.css'
import CartIcon from '../Cart/CartIcon'
import CartContext from '../../store/cart-context'

function HeaderCartButton(props) {
  const [playAnimation, setPlayAnimation] = useState(false)
  const cartCntx = useContext(CartContext)
  const btnClasses =`${classes.button} ${playAnimation ? classes.bump :''}`
  useEffect(()=>{
    if(cartCntx.items.length === 0){
      return
    }
    setPlayAnimation(true)
    const timer = setTimeout(()=>{
      setPlayAnimation(false)
    }, 300)
    return ()=>{
      clearTimeout(timer)
    }

  },[cartCntx.items])
    

  const cartItemNumber = cartCntx.items.reduce((current,item)=>{
    return current+item.amount
  },0)
  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{cartItemNumber}</span>
    </button>
  )
}

export default HeaderCartButton