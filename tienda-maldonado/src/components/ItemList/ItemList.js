import Item from '../Item/Item'
import productos from '../../data/productos.json'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const ItemList = () => {
    const [products, setProducts] = useState([]);
    const { categoryId } = useParams()

    const getFetch = () => {
        return new Promise((resolve) => {
            resolve(productos)
        })
    }
  
    useEffect(() => {
        if (categoryId) {
            getFetch()
            .then((data) => {
                    setProducts(data.filter(item => item.category === categoryId))
                })
            .catch(error => { console.log(error)}) 
        } else {
            getFetch()
            .then((data) => {
                    setProducts(data)
                })
            .catch(error => { console.log(error)})      
        }
    }, [categoryId])

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