import { useContext, useEffect, useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { CartContext } from "../../contexts/cartContext"

const CartWidget = () => {
  const { cart } = useContext(CartContext)
  const [cant, setCant] = useState(0)
  
  useEffect(() => {
    let cantTotal;
      cart.map(item => {
        cantTotal =+ item.cantidad;
      }
      )
      setCant(cantTotal)
  }, [cart])

  return (
    <>
      <FontAwesomeIcon icon={faCartShopping} />  
      {
        cant > 0 ?
          <span className="badge badge-light">{cant}</span>
          :
          null
      }
    </>
  )
}

export default CartWidget