
import { useContext } from "react"
import { CartContext } from "./CartContext"

export function ShoppingCart() {
    const cartContext = useContext(CartContext)
    console.log("render menubar")
    console.table(cartContext?.items)

    const count = cartContext?.items.reduce((acc, item) => acc + item.quantity, 0)

    return (
        <div className="relative">
            <img src="/cart.svg" alt="Cart" className="w-6 h-6" />
            <div className="absolute top-0 right-0 w-4 h-4 bg-red-500 text-white text-xs flex items-center justify-center rounded-full">
                {count}
            </div>
        </div>
    )
}