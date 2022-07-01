import { useContext, useEffect, useState } from "react"
import { CartContext } from "../../contexts/cartContext"
import {NavLink} from 'react-router-dom';

const Cart = () => {
  const { cart, removeCart, removeItem } = useContext(CartContext)
  const [empty, setEmpty] = useState(false)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    cart.length > 0 ? setEmpty(true) : setEmpty(false)
  }, [cart.length])

  useEffect(() => {
    let totalSum = 0
    cart.map(item => {
      totalSum += item.cantidad * item.price
    })
    setTotal(totalSum)
  }, [cart])

  return (
    <>
    {
      empty ?
        <div>
          <ul>
            {
              cart.map(item => 
                <li key={item.id}>
                <p>Libro: {item.producto} </p>
                <p>Cantidad: {item.cantidad}</p>
                <p>Total: {(item.price * item.cantidad)}</p>
              
                <button onClick={removeItem(item, "one")}>-1</button>
                <button onClick={removeItem(item, "all")}>Eliminar todo el producto</button>
                </li>
              )
            }
            <h2>Total de compra: {total}</h2>
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