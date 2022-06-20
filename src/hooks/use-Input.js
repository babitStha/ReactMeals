import {useState} from 'react'

const useInput = (validate) => {
    const [value, setValue] = useState('')
    const [touched, setTouched] = useState(false)
    
    const isValid = validate(value)
    const error = touched && !isValid
    const onValueChangeHandler = event =>{
        setValue(event.target.value)
    }
    const onValueBlurHandler = () => {
        setTouched(true)
    }
    const reset = () => {
        setValue('')
        setTouched(false)
    }
  return (
    {
        value,
        error,
        reset,
        isValid,
        onValueBlurHandler,
        onValueChangeHandler
    }
  )
}

export default useInput