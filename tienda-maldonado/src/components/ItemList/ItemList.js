import Item from '../Item/Item'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { getDocs, collection, query, where, getFirestore } from 'firebase/firestore'

const ItemList = () => {
    const [products, setProducts] = useState([]);
    const { categoryId } = useParams()

    useEffect(() => {
        if(!categoryId){
        //Para tener una lista de items
            const db = getFirestore()
            const queryCollection = collection(db, 'productos')
            getDocs(queryCollection) //promesa
                .then(resp => {
                    setProducts(resp.docs.map(doc => {
                        return {
                            id: doc.id,
                            ...doc.data()
                        }
                    }))
                })
                .catch(err => {
                    console.log(err)
                })
        }
        else{
        //Para tener items filtrados
            const db = getFirestore()
            const queryCollection = collection(db, 'productos')
            const queryCollectionFilter = query( queryCollection, where('category', '==', categoryId) )
            getDocs(queryCollectionFilter)
                .then(resp => {
                    setProducts(resp.docs.map(doc => {
                        return {
                            id: doc.id,
                            ...doc.data()
                        }
                    }))
                })
                .catch(err => {
                    console.log(err)
                })
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