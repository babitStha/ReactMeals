import { useState, useEffect } from 'react'
import classes from './AvailableMeals.module.css'
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';





const AvailableMeals = () => {
  const [meals, setMeals] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const response = await fetch('https://learnreact-f4053-default-rtdb.firebaseio.com/meals.json')
        if(!response.ok){
          throw new Error("Something went wrong!")
        }
        const data = await response.json()
        const loadedData = []
        for (const key in data) {
          loadedData.push({
            id: key,
            name: data[key].name,
            description: data[key].description,
            price: data[key].price,
          })
        }
        setMeals(loadedData)
      } catch (err) {
          setError(err.message)
      }
      setIsLoading(false)
    }
    fetchData()
  }, [])

  const mealList = meals.map(meal => {
    return (
      <MealItem key={meal.id} id={meal.id} name={meal.name} description={meal.description} price={meal.price} />
    )
  })
  return (
    <section className={classes.meals}>
      <Card>

        {isLoading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {!error && !isLoading && <ul>
          {mealList}
        </ul>}
      </Card>
    </section>
  )
}

export default AvailableMeals