import './css/App.css';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';

import NavBar from './components/NavBar/NavBar';
import ItemListContainer from './components/ItemListContainer/ItemListContainer';
import ItemCount from './components/ItemCount/ItemCount';
import Cart from './components/Cart/Cart';
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer';


function App() {

  return (
    <BrowserRouter>
      <NavBar />
        <Routes>
          <Route path="/" element={<ItemListContainer />} />
          {/* <Route path="/" element={<ItemDetailContainer />} /> */}
          <Route path="/cart" element={<Cart />} />
          {/* <Navigate path='*' element={<Navigate to='/' />} /> */}
        </Routes>
      <ItemCount stock={5} initial={0} />
      <ItemDetailContainer />
    </BrowserRouter>
  );
}

export default App;
