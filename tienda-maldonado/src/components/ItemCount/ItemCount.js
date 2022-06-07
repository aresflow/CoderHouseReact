import {useState} from 'react';

const ItemCount = ({stock, initial}) => {

  const [count, setCount] = useState(initial);

  const onAdd = () => {
    if (count < stock) {
        setCount(count + 1);
        console.log('La cantidad seleccionada es: ' + (count + 1));
    }
    else {
        console.log('No hay stock suficiente');
    }
  }

  const onDelete = () => {
    if (count > 0) {
        setCount(count - 1);
        console.log('La cantidad seleccionada es: ' + (count - 1));
    }
    else {
        console.log('No hay elementos para eliminar');
    }
  }

  return (
    <div className='counter_container'>
        <p className='counter_text'>El contador es: {count}</p>
        <div className='counter_button_container'>
            <button className='counter_button' onClick={onAdd}>Agregar +1</button>
            <button className='counter_button' onClick={onDelete}>Eliminar -1</button>
        </div>
    </div>
  )
}

export default ItemCount