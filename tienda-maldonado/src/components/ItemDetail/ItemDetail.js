import React from 'react'
import {NavLink} from 'react-router-dom';
import { useState } from 'react'
import ItemCount from '../ItemCount/ItemCount'

const ItemDetail = ({title, price, pictureUrl, description, stock}) => {

  const [count, setCount] = useState(0)

  const onAdd = (cant) => {
    setCount(cant)
  }
  
  return (
    <div className="row detail_container">       
      <div className="col-md">        
          <div className="card text-center">
          <img className="card-img detail_img" src={pictureUrl} alt={title}/>
          </div>          
      </div>    

      <div className="card-body detail_body">
              <h4 className="card-title detail_title"> {title} </h4>
              <p className="detail_details">Descripción: {description} </p>
              <p className="card-text detail_price">Precio: {price} </p>
              {
                count > 0 ? 
                <NavLink to="/cart" className="button_cart btn btn-primary">Ir al carrito</NavLink> : 
                <ItemCount stock={stock} initial={0} onAdd={onAdd}/>
              }
              
            </div>
    </div>
  )
}

export default ItemDetail