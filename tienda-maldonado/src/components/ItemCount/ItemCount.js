import {useState} from 'react';

const ItemCount = ({stock, initial, onAdd}) => {

  const [count, setCount] = useState(initial);
  const [cantidad, setCantidad] = useState('');

  const onSuma = () => {
    if (count < stock) {
        setCount(count + 1);
    }
    else {
        setCantidad("No hay stock suficiente, cantidad maxima: " + stock);
    }
  }

  const onDelete = () => {
    if (count > 0) {
        setCount(count - 1);
        setCantidad('');
    }
  }

  const add = () => {
    onAdd(count)
  }

  return (
    <div className='counter_container'>
        <p className='counter_text'>Items en carrito: {count}</p>
        {
          cantidad ? <p className='counter_text2'>{cantidad}</p> : null
        }
        <div className='counter_button_container'>
            <button className='btn btn-danger' onClick={onDelete}>-1</button>
            <button className='btn btn-primary' onClick={onSuma}>+1</button>
        </div>
        <button className='btn btn-primary button_agregar' onClick={add}>Agregar al carrito</button>
    </div>
  )
}

export default ItemCount