import {useState} from "react";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/CartProvider";

function App() {
  const [displayCart, setDisplayCart] = useState(false)
  const onClickHandler = ()=>{
    setDisplayCart(!displayCart)
  }
  return (
    <CartProvider>
      {displayCart && <Cart onClick={onClickHandler}/>}
      <Header onClick={onClickHandler}/>
      <main>
        <Meals />

      </main>
    </CartProvider>
  );
}

export default App;
