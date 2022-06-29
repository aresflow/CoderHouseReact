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

    const removeItem = (item, band) => () => {
        if (cart.find(p => p.id === item.id)) {
            cart.map((p) => {
                if (p.id === item.id && band === "one") { 
                    p.cantidad -= 1;
                    if(p.cantidad === 0){
                        cart.splice(cart.indexOf(p), 1);
                        p.cantidad -= item.cantidad; 
                    } 
                    setCart([...cart]) 
                }
                if (p.id === item.id && band === "all") {
                    cart.splice(cart.indexOf(p), 1);
                    p.cantidad -= item.cantidad; 
                    setCart([...cart]) 
                }
            });
        }
    }

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                removeCart,
                removeItem
            }}
        >
            {children}
        </CartContext.Provider>
    )
}