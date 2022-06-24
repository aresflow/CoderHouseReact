import { createContext, useState } from "react";

export const CartContext = createContext([])

export const CartContextProvider = ({ children }) => {

    const [cart, setCart] = useState([])

    const addToCart = (item) => {
        if(cart.length > 0){
            cart.find(p => {
                if(p.id === item.id) {
                    p.cantidad += item.cantidad
                    
                }
                else {
                    setCart([...cart, item])
                }
            })
        }
        // }
            // console.log(cartItem, "console del cartitem")
            // setCart([...cartItem, item])
        // }
        else {
            setCart([...cart, item])
        }
    }

    const removeCart = () => {
        setCart([])
    }

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                removeCart
            }}
        >
            {children}
        </CartContext.Provider>
    )
}