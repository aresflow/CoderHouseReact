import { useState, useEffect } from "react"
import { useParams } from 'react-router-dom';

import productos from '../../data/productos.json'
import ItemDetail from "../ItemDetail/ItemDetail"


const ItemDetailContainer = () => {

    const [itemDetail, setItemDetail] = useState([])
    const [loading, setLoading] = useState(true)
    const { id } = useParams()

    const getItemDetail = () => {
        return new Promise((resolve) => {
            resolve(productos)
        })
    }

    useEffect(() => {
        getItemDetail()
            .then((data) => {
                setItemDetail(data.find(item => item.id === id))
                setLoading(false)
                })
            .catch(error => { console.log(error)})
    }, [id])

            // const item = await fetch('/assets/data/item.json')
            // const itemFetched = await item.json()
            // setItemDetail(itemFetched)
            // setLoading(false)
// console.log(itemDetail)
  return (
    <div>
        {
            loading ? <p>Loading...</p> :
            <ItemDetail id={itemDetail.id} title={itemDetail.title} price={itemDetail.price} pictureUrl={itemDetail.pictureUrl} description={itemDetail.description} stock={itemDetail.stock}/>
        }
    </div>
  )
}

export default ItemDetailContainer