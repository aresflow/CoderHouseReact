
const ItemListContainer = ({greeting}) => {

  let arrayObj = [
    {saludo: greeting, 
      nombre: 'persona'
    }, 
    {saludo: 'Hola', 
    nombre: 'Ezequiel'
    },
  ];

  const getFetch = () => {
      return new Promise((resolve, reject) => {
          resolve(arrayObj)
      })
  }

  return (
    setTimeout(() => {
      getFetch()
        .then(data => {
          return (
            console.log(data) 
          )
      })
      .catch(error => { console.log(error)})
    }, 3000)

  )}

export default ItemListContainer