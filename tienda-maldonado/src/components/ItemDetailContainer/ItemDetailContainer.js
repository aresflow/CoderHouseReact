import { useState, useEffect } from "react"
import { useParams } from 'react-router-dom';
import { doc, getDoc, getFirestore } from 'firebase/firestore'
import ItemDetail from "../ItemDetail/ItemDetail"

const ItemDetailContainer = () => {

    const [itemDetail, setItemDetail] = useState([])
    const [loading, setLoading] = useState(true)
    const { id } = useParams()

    useEffect(() => {
        const db = getFirestore()
        const queryItem = doc(db, 'productos', id)
        getDoc(queryItem)
            .then(resp => {
                setItemDetail({
                    id: resp.id,
                    ...resp.data()
                })
                setLoading(false)

            })
            .catch(err => {
                console.log(err)
            })
    }, [])

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