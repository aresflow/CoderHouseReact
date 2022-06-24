import { createContext, useState } from "react";

export const CartContext = createContext([])

export const CartContextProvider = ({ children }) => {

    const [cart, setCart] = useState([])

    const addToCart = (item) => {
        if (cart.find(p => p.id === item.id)) {
            cart.map((p) => { if (p.id === item.id) { 
                p.cantidad += item.cantidad; 
                setCart([...cart]) }});}
        else 
            setCart([...cart, item]);
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