import {useRef, useState} from 'react'
import classes from './MealItemForm.module.css'
import Input from '../../UI/Input'

const MealItemForm = props => {
  const [isAmountValid, setIsAmountValid] =useState(true)
  const amountInputRef = useRef()
  const onSubmitHandler = event=>{
    event.preventDefault()
    const enteredAmount = amountInputRef.current.value
    const enteredAmountNumber = +enteredAmount
    if(enteredAmount.trim().length ===0 || enteredAmountNumber < 1 || enteredAmountNumber > 5 ){
        setIsAmountValid(false)
        return
    }

    props.onAddToCart(enteredAmountNumber)
  }
  return (
    <form className={classes.form} onSubmit={onSubmitHandler}>
        <Input  ref={amountInputRef} label="Amount" input={{
          id:"amount",
          type:'number',
          min:1,
          max:5,
          step:1,
          defaultValue:1,
        }}/>
        <button>+ Add</button>
        {!isAmountValid && <p>Please enter a valid Amount (1-5).</p>}
    </form>
  )
}

export default MealItemForm