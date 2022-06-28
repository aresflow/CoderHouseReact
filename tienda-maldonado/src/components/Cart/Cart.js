import { useContext, useEffect, useState } from "react"
import { CartContext } from "../../contexts/cartContext"
import {NavLink} from 'react-router-dom';

const Cart = () => {
  const { cart, removeCart, removeItem } = useContext(CartContext)
  const [empty, setEmpty] = useState(false)

  useEffect(() => {
    cart.length > 0 ? setEmpty(true) : setEmpty(false)
  }, [cart.length])

  return (
    <>
    {
      empty ?
        <div>
          <ul>
            {
              cart.map(item => 
                <li key={item.id}>
                Libro: {item.producto} 
                Cantidad: {item.cantidad}
                <button onClick={removeItem(item, "one")}>-1</button>
                <button onClick={removeItem(item, "all")}>Eliminar todo el producto</button>
                </li>
              )
            }
          </ul>

            <button onClick={removeCart}>Vaciar carrito</button>

        </div>
        :
        <>
          <h2>No hay nada en el carrito</h2>
          <NavLink to="/">Volver a la tienda</NavLink>
        </>
    }
    </>
  )
}

export default Cart