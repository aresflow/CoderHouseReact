import { useState, useEffect } from "react"
import ItemDetail from "../ItemDetail/ItemDetail"

const ItemDetailContainer = () => {

    const [itemDetail, setItemDetail] = useState([])
    const [loading, setLoading] = useState(true)

    const getItemDetail = async () => {
        try {
            const item = await fetch('/assets/data/item.json')
            const itemFetched = await item.json()
            setItemDetail(itemFetched)
            setLoading(false)
        }
        catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getItemDetail()
    }, [])

  return (
    <div>
        {
            loading ? <p>Loading...</p> :
            <ItemDetail id={itemDetail.item[0].id} title={itemDetail.item[0].title} price={itemDetail.item[0].price} pictureUrl={itemDetail.item[0].pictureUrl} />
        }
    </div>
  )
}

export default ItemDetailContainer