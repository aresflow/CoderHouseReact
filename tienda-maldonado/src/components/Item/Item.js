import {Link, NavLink} from 'react-router-dom';

const Item = ({id, title, price, pictureUrl}) => {
  return (
    <div className="row">       
      <div className="col-md">        
          <div className="card text-center">
            <div className="card-body">
              <h4 className="card-title">{title}</h4>
              <img className="card-img" src={pictureUrl} alt={title}/>
              <p className="card-text">Precio: {price}</p>
              <Link to={`/detail/${id}`} className="btn btn-primary">
                <button className="btn btn-primary">Detalles</button>
              </Link>
            </div>
          </div>          
      </div>    
    </div>
  )
}

export default Item