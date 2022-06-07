import './css/App.css';
import ItemListContainer from './components/ItemListContainer/ItemListContainer';
import NavBar from './components/NavBar/NavBar';
import ItemCount from './components/ItemCount/ItemCount';

function App() {
  const greeting = "Hola soy Item List Container"

  return (
    <>
      <NavBar />
      <ItemListContainer greeting={greeting} />
      <ItemCount stock={5} initial={0} />
    </>
  );
}

export default App;
