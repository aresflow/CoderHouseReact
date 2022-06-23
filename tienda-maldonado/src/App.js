import './css/App.css';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';

import NavBar from './components/NavBar/NavBar';
import ItemListContainer from './components/ItemListContainer/ItemListContainer';
import Cart from './components/Cart/Cart';
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer';
import { CartContextProvider } from './contexts/cartContext';


function App() {

  return (
    <CartContextProvider>
      <BrowserRouter>
        <NavBar />
          <Routes>
            <Route path="/" element={<ItemListContainer />} />
            <Route path="/category/:categoryId" element={<ItemListContainer />} />
            <Route path="/detail/:id" element={<ItemDetailContainer />} />
            <Route path="/cart" element={<Cart />} />
            <Route path='*' element={<Navigate to='/' />} />
          </Routes>
      </BrowserRouter>
    </CartContextProvider>
  );
}

export default App;
