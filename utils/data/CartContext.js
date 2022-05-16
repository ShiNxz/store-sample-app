import { createContext, useEffect, useState } from 'react'
import GroupBy from '../functions/Group'

const CartContext = createContext()

export const CartContextProvider = ({ children }) => {
	const [cart, setCart] = useState([])
	const [cartItems, setCartItems] = useState([])

	useEffect(() => setCartItems(GroupBy(cart, 'itemId')), [cart])

	return <CartContext.Provider value={{ cart, setCart, cartItems }}>{children}</CartContext.Provider>
}

export default CartContext
