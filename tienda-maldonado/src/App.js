import './css/App.css';
import ItemListContainer from './components/ItemListContainer/ItemListContainer';
import NavBar from './components/NavBar/NavBar';

function App() {
  const greeting = "Hola soy Item List Container"

  return (
    <>
      <NavBar />
      <ItemListContainer greeting={greeting} />
    </>
  );
}

export default App;
