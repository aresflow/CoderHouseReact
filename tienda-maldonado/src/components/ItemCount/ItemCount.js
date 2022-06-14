import {useState} from 'react';

const ItemCount = ({stock, initial}) => {

  const [count, setCount] = useState(initial);
  const [cantidad, setCantidad] = useState('');

  const onAdd = () => {
    if (count < stock) {
        setCount(count + 1);
        console.log('La cantidad seleccionada es: ' + (count + 1));
    }
    else {
        setCantidad("No hay stock suficiente, cantidad maxima: " + stock);
        console.log('No hay stock suficiente');
    }
  }

  const onDelete = () => {
    if (count > 0) {
        setCount(count - 1);
        setCantidad('');
        console.log('La cantidad seleccionada es: ' + (count - 1));
    }
    else {
        console.log('No hay elementos para eliminar');
    }
  }

  return (
    <div className='counter_container'>
        <p className='counter_text'>Items en carrito: {count}</p>
        {
          cantidad ? <p className='counter_text2'>{cantidad}</p> : null
        }
        <div className='counter_button_container'>
            <button className='counter_button' onClick={onAdd}>Agregar +1</button>
            <button className='counter_button' onClick={onDelete}>Eliminar -1</button>
        </div>
    </div>
  )
}

export default ItemCount