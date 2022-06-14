import React from 'react'
import {NavLink} from 'react-router-dom';

import CartWidget from '../CartWidget/CartWidget'

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <NavLink to='/' className="navbar-brand">Libreria Stark</NavLink>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
    
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <NavLink to='/' className={({ isActive }) => isActive ? 'nav-link' : 'nav-link'}>Inicio</NavLink>
          </li>
          <li className="nav-item">
            <a className="nav-link disabled" href="h">En oferta</a>
          </li>
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="https" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Categorias
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              <NavLink to='/category/sf' className="dropdown-item">Ciencia Ficcion</NavLink>
              <NavLink to='/category/terror' className="dropdown-item">Terror</NavLink>
              <NavLink to='/category/childish' className="dropdown-item">Infantil</NavLink>
              <NavLink to='/category/romance' className="dropdown-item">Romance</NavLink>
              <div className="dropdown-divider"></div>
              <a className="dropdown-item disabled" href="h">Quienes somos</a>
            </div>
          </li>
          <li className="nav-item">
            <a className="nav-link disabled" href="h">Ayuda con mi pedido</a>
          </li>
        </ul>
        <form className="form-inline my-2 my-lg-0 search-selector">
          <input className="form-control mr-sm-2" type="search" placeholder="Nombre del producto" aria-label="Search" />
          <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Buscar</button>
        </form>
      </div>
      <NavLink to='/cart' className="cart-widget">
        <CartWidget />
      </NavLink>
    </nav>
  )
}

export default NavBar