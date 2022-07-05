import { useContext, useEffect, useState } from "react"
import { getFirestore, collection, addDoc, doc, docs, getDocs, updateDoc, where, query, writeBatch, documentId } from "firebase/firestore"
import { CartContext } from "../../contexts/cartContext"
import {NavLink} from 'react-router-dom';

const Cart = () => {
  const { cart, removeCart, removeItem } = useContext(CartContext)
  const [empty, setEmpty] = useState(false)
  const [total, setTotal] = useState(0)
  const [idCompra, setIdCompra] = useState(0)

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

    const generateOrder = async (e) => {
    e.preventDefault()
    let orden = {}

    orden.buyer = {name: "Eze", email: "eze@gmail.com", phone: "11111"}
    orden.total = total

    orden.items = cart.map(cartItem => {
      const id = cartItem.id
      const name = cartItem.producto
      const price = cartItem.price * cartItem.cantidad

      return {id, name, price}
    })

    const db = getFirestore()

    //Para agregar una nueva orden a la base de datos
    const orderCollection = collection(db, "orders")
    addDoc(orderCollection, orden)
    .then(resp => {
      setIdCompra(resp.id)
      console.log(resp.id)   //ESTO DA EL ID AUTOGENERADO POR CADA COMPRA
    })
    .catch(err => {
      console.log(err)
    })

    //Para actualizar el estado de una orden en la base de datos
    const queryCollectionStock = collection(db, "productos")

    const queryUpdateStock = await query(
      queryCollectionStock,
      where( documentId(), 'in', cart.map(item => item.id) ) //trae los id de los productos de firestore que coincidan con los de cart.map
    )

    const batch = writeBatch(db)

    await getDocs(queryUpdateStock)
    .then(resp => {
      resp.docs.forEach(res => batch.update(res.ref, {
        stock: res.data().stock - cart.find(item => item.id === res.id).cantidad}))
    })
    .catch(err => {
      console.log(err)
    })
    .finally(() => {
      removeCart()
    })
    batch.commit()

    //Para actualizar la base de datos de firebase
    // const updateCollection = doc(db, "productos", 'CgSYOdWbg2slavImDWj7')
    // updateDoc(updateCollection, {stock: 10}) //Le paso el item que quiero actualizar
    // .then(() => {
    //   console.log( 'actualizado')
    // })
  }

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
                <button className="btn btn-outline-danger" onClick={removeItem(item, "all")}>Eliminar todo el producto</button>
                </li>
              )
            }
            <h2>Total de compra: {total}</h2>
            {
              <button className="btn btn-outline-success" onClick={generateOrder}>Generar orden</button>
            }
          </ul>
            <button className="btn btn-outline-danger" onClick={removeCart}>Vaciar carrito</button>
        </div>
        :
        <>
          {
            idCompra.length > 0 ?
            <h2>Id de compra: {idCompra}</h2>
            :
            <h2>No hay nada en el carrito</h2>
          }
          <NavLink to="/">Volver a la tienda</NavLink>
        </>
    }
    </>
  )
}

export default Cart