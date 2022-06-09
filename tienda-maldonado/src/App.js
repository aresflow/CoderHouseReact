import './css/App.css';
import ItemListContainer from './components/ItemListContainer/ItemListContainer';
import NavBar from './components/NavBar/NavBar';
import ItemCount from './components/ItemCount/ItemCount';

function App() {

  return (
    <>
      <NavBar />
      <ItemCount stock={5} initial={0} />
      <ItemListContainer />
    </>
  );
}

export default App;
