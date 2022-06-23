import { useContext } from "react"
import { CartContext } from "../../contexts/cartContext"

const Cart = () => {
  const { cart, removeCart } = useContext(CartContext)

  return (
    <div>
      <ul>
        {
          cart.map(item => 
            <li key={item.id}>
            Libro: {item.producto} 
            Cantidad: {item.cantidad}
            </li>
          )
        }
      </ul>
    
      <div>
        <button onClick={removeCart}>Vaciar carrito</button>
      </div> 
    </div>
  )
}

export default Cart