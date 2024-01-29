import { ReactNode, createContext, useState } from "react"

type CartItem = {
    productId: number;
    quantity: number;
}

type CartType = {
    items: CartItem[],
    addToCart: (productId: number, count: number) => void,
    clearCart: () => void
}

export const CartContext = createContext<CartType|null>(null)

export function Cart({children}: {children: ReactNode}) {

    const[items, setItems] = useState<CartItem[]>([])

    const cart = {
        items: items,
        addToCart: (productId: number, count: number) => {
            const item = items.find(p => p.productId === productId)
            if (item) {
                item.quantity += count
                if (item.quantity <= 0) {
                    const index = items.indexOf(item)
                    items.splice(index, 1)
                }
            } else {
                items.push({productId, quantity: count})
            }
            console.table(items)
            setItems([...items])
        },
        clearCart: () => {
            setItems([])
        }
    } as CartType
    return (
        <CartContext.Provider value={cart}>
            {children}
        </CartContext.Provider>
    )

}
