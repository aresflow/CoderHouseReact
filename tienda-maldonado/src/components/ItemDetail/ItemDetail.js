import React from 'react'
import ItemCount from '../ItemCount/ItemCount'

const ItemDetail = ({title, price, pictureUrl, description, stock}) => {
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
              <ItemCount stock={stock} initial={0} />
            </div>
    </div>
  )
}

export default ItemDetail