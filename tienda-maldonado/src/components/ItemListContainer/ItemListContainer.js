import ItemList from "../ItemList/ItemList"

const ItemListContainer = () => {
  return (
    <div className="main_container">
    {
      ItemList()
    }
    </div>
  )
}

export default ItemListContainer