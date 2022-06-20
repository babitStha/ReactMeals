import classes from './Checkout.Module.css'
import useInput from '../../hooks/use-Input'

const Checkout = (props) => {
    const {
        value:name,
        error:nameHasError,
        isValid:nameIsValid,
        reset:resetNameInput,
        onValueBlurHandler:onNameBlurHandler,
        onValueChangeHandler:onNameChangeHandler
    } = useInput((name)=>name.trim().length > 0)
    const {
        value:address,
        error:addressHasError,
        isValid:addressIsValid,
        reset:resetAddressInput,
        onValueBlurHandler:onAddressBlurHandler,
        onValueChangeHandler:onAddressChangeHandler
    } = useInput((name)=>name.trim().length > 0)
    const {
        value:street,
        error:streetHasError,
        isValid:streetIsValid,
        reset:resetStreetInput,
        onValueBlurHandler:onStreetBlurHandler,
        onValueChangeHandler:onStreetChangeHandler
    } = useInput((name)=>name.trim().length >= 5)
    const {
        value:contact,
        error:contactHasError,
        isValid:contactIsValid,
        reset:resetContactInput,
        onValueBlurHandler:onContactBlurHandler,
        onValueChangeHandler:onContactChangeHandler
    } = useInput((name)=>name.trim().length >= 10)

    const formIsValid = nameIsValid && contactIsValid && addressIsValid && streetIsValid
    
    const formSubmitHandler = event =>{
        event.preventDefault()
        if(!formIsValid){
            return
        }
        const data = {
            name,
            contact,
            address,
            street
        } 
        resetNameInput()
        resetContactInput()
        resetAddressInput()
        resetStreetInput()
        props.onSubmit(data)
    }
  return (
    <form onSubmit={formSubmitHandler}>
        <div className={classes.control}>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" value={name} onChange ={onNameChangeHandler} onBlur={onNameBlurHandler}/>
            {nameHasError && <p>Please enter a valid name.</p>}
        </div>
        <div className={classes.control}>
            <label htmlFor="contact">Contact</label>
            <input type="text" id="contact" value={contact} onChange ={onContactChangeHandler} onBlur={onContactBlurHandler}/>
            {contactHasError && <p>Please enter a valid contact.</p>}
        </div>
        <div className={classes.control}>
            <label htmlFor="address">Address</label>
            <input type="text" id="address" value={address} onChange ={onAddressChangeHandler} onBlur={onAddressBlurHandler}/>
            {addressHasError && <p>Please enter a valid address.</p>}
        </div>
        <div className={classes.control}>
            <label htmlFor="street">Street</label>
            <input type="text" id="street" value={street} onChange ={onStreetChangeHandler} onBlur={onStreetBlurHandler}/>
            {streetHasError && <p>Please enter a valid Street.</p>}
        </div>
        
        <div className="button">
            <button disabled={!formIsValid}>Confirm</button>
        </div>
    </form>
  )
}

export default Checkout