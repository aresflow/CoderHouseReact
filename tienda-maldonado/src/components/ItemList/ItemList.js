import Item from '../Item/Item'
import productos from '../../data/productos.json'
import { useEffect, useState } from 'react'

const ItemList = () => {
    const [products, setProducts] = useState([]);

    const getFetch = () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(productos)
            }, 2000)
        })
    }
  
    useEffect(() => {
        getFetch()
            .then((data) => {
                    setProducts(data)
                })
            .catch(error => { console.log(error)})
    }, [])

    return (
    <>
        {
            products.map(item => (
                <Item key={item.id} id={item.id} title={item.title} price={item.price} pictureUrl={item.pictureUrl} />
            ))
        }
    </>
    )
}
   
export default ItemList