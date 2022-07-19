import { useContext, useEffect, useState } from "react"
import { getFirestore, collection, addDoc, getDocs, where, query, writeBatch, documentId } from "firebase/firestore"
import { CartContext } from "../../contexts/cartContext"
import {NavLink} from 'react-router-dom';
import { useForm } from "../../hooks/useForm";

const Cart = () => {
  const { cart, removeCart, removeItem, addItem } = useContext(CartContext)
  const [empty, setEmpty] = useState(false)
  const [total, setTotal] = useState(0)
  const [idCompra, setIdCompra] = useState(0)

  useEffect(() => {
    cart.length > 0 ? setEmpty(true) : setEmpty(false)
  }, [cart.length])

  useEffect(() => {
    let totalSum = 0
    cart.map(item => {
      return totalSum += item.cantidad * item.price
    })
    setTotal(totalSum)
  }, [cart])

  const generateOrder = async (e) => {
    let orden = {}

    orden.buyer = {name: name, email: email, phone: phone}
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
      setIdCompra(resp.id) //ESTO DA EL ID AUTOGENERADO POR CADA COMPRA
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
  }

  const [formValues, errors, handleInputChange, validate] = useForm({
    name: '',
    email: '',
    email2: '',
    phone: ''
  });

  const { name, email, email2, phone } = formValues;

  useEffect(() => {
    validate(formValues)
  }, [name, email, email2, phone])

  const handleSubmit = (e) => {
      e.preventDefault();
      generateOrder();
  }

  return (
    <>
    {
      empty ?
        <div>
          <ul>
            {
              cart.map(item =>
              <div key={item.id} className="cart-container">
                <div className="cart-product-container">
                  <li className="cart-li-container" key={item.id}>
                    <div>
                      <img className="cart-product-img" src={item.pictureUrl} alt=""/>
                    </div>
                    <h2 className="cart-p-container">Libro: {item.producto} </h2>
                  </li>
                </div>
                <div className="cart-button-container">
                  <button className="btn btn-outline-secondary" onClick={removeItem(item, "one")}>-1</button>
                  <p className="cart-cant-container">Cantidad: {item.cantidad}</p>
                  <button className="btn btn-outline-secondary" onClick={addItem(item)}>+1</button>
                  <button className="btn btn-outline-danger btn-cart" onClick={removeItem(item, "all")}>X</button>
                </div>
                <h2 className="cart-p-container cart-total-container">Total: {(item.price * item.cantidad)}</h2>
              </div> 
              )
            }
            <h3>Total de compra: {total}</h3>
            <button className="btn btn-outline-danger" onClick={removeCart}>Vaciar carrito</button>
            {
              <>
                <form onSubmit={ handleSubmit }>
                  <hr />
                  <h4>Formulario de compra</h4>
                  <div className="form-group">
                    <label htmlFor="name">Nombre</label>
                      <input type="text" name="name"  className="form-control"
                      placeholder="Tu nombre" autoComplete="off" value={ name } onChange={ handleInputChange }>   
                      </input>
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                      <input type="text" name="email" className="form-control"
                      placeholder="email@gmail.com" autoComplete="off" value={ email } onChange={ handleInputChange } required>   
                      </input>
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Confirme su email</label>
                      <input type="text" name="email2" className="form-control"
                      placeholder="email@gmail.com" autoComplete="off" value={ email2 } onChange={ handleInputChange } required>   
                      </input>
                      {
                        email2.length > 2 ? (errors === 'El email debe coincidir' ? <p className="error alert alert-danger">{ errors }</p> : null) : null
                      }
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone">Telefono</label>
                      <input type="text" name="phone" className="form-control"
                      placeholder="341333333" value={ phone } onChange={ handleInputChange }>   
                      </input>
                  </div>

                  <button className="btn btn-outline-success" disabled={ errors === 'Campos rellenados correctamente' ? false : true } onClick={handleSubmit}>Generar orden</button>
                </form>
              </>
            }
          </ul>
        </div>
        :
        <>
          {
            idCompra.length > 0 ?
            <div className="jumbotron text-center">
              <h1 className="display-3">Thank You!</h1>
              <p className="lead">Tu orden fue realizada con exito. Te contactaremos pronto.</p>
              <h3>Id de compra: {idCompra}</h3>
              <p className="lead"><strong>Por favor revisa tu email</strong> donde se te ha enviado la información referida a esta compra.</p>
              <p className="lead">
                <NavLink className="btn btn-primary btn-sm" to="/">Volver a la tienda</NavLink>
              </p>
            </div>
            :
            <div className="container-fluid  mt-100">
				      <div className="row empty-cart-container">
					      <div className="col-md-12">			
							    <div className="card">
                    <div className="card-body cart">
                        <div className="col-sm-12 empty-cart-cls text-center">
                          <img src="https://i.imgur.com/dCdflKN.png" width="130" height="130" className="img-fluid mb-4 mr-3" alt="cart" />
                          <h3><strong>Tu carrito esta vacío</strong></h3>
                          <h4>Vuelve a la tienda para continuar comprando</h4>
                          <NavLink className="btn btn-primary btn-sm" to="/">Volver a la tienda</NavLink>
								        </div>
						        </div>
				          </div>		
                </div>
              </div>
            </div>
          }
          
        </>
    }
    </>
  )
}

export default Cart