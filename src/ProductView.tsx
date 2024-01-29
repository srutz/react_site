// product panel that shows the product with title and image, description, price, and stock

import { ReactNode, useContext, useEffect, useState } from "react"
import { Product } from "./Products"
import { CartContext } from "./CartContext"

export function ProductView({ product }: { product: Product }) {

    useEffect(() => {
        console.log("ProductView useEffect")
        setImageIndex(0)
    }, [ product.id]);

    const [imageIndex, setImageIndex] = useState(0)
    const [opacity, setOpacity] = useState(1)
    //console.log("ProductView render " + imageIndex)
    //console.table(product.images)
    const cartContext = useContext(CartContext)

    const changeImage = (delta: number) => {
        setOpacity(0)
        setTimeout(() => {
            let newIndex = imageIndex + delta
            if (newIndex >= product.images.length) {
                newIndex = 0
            } else if (newIndex < 0) {
                newIndex = product.images.length - 1
            }
            setImageIndex(newIndex)
            setOpacity(1)
        }, 250)
    }

    return <div className="w-8/12 border-solid border-2 border-indigo-100 bg-white p-3 gap-1 flex flex-col">
        <div className="text-1xl uppercase font-bold">{product.title}</div>
        <div className="flex justify-center relative">
            {product.images.length > 1 && <ImageSwitchButton side="LEFT" onClick={() => changeImage(-1)}>◀</ImageSwitchButton>}
            <img style={{ opacity: opacity, transition: "all 250ms" }} className="object-cover w-auto h-64" src={product.images[imageIndex]} alt={product.title} />
            {product.images.length > 1 && <ImageSwitchButton side="RIGHT" onClick={() => changeImage(1)}>▶</ImageSwitchButton>}
        </div>
        <div className="p-top-8 h-16 pt-3 text-sm overflow-hidden">{product.description}</div>
        <div className="flex overflow-hidden">
            <div className="font-bold">{product.price.toFixed(2)} €</div>
            <div className="grow"></div>
            <div className="p-2 w-12 cursor-pointer select-none text-center border border-gray-200" onClick={() => {cartContext?.addToCart(product.id, -1)}}>-</div>
            <div className="p-2 w-12 cursor-pointer select-none text-center border border-gray-200" onClick={() => {cartContext?.addToCart(product.id, 1)}}>+</div>
            <div className="grow"></div>
            <div>Bestand: <span className="font-bold">{product.stock}</span></div>
        </div>
    </div>
}

function ImageSwitchButton({ children, side, onClick }: { children: ReactNode, side: "RIGHT"|"LEFT", onClick: () => void }) {
    return (
        <div className={`absolute inset-y-0 ${side == "LEFT" ? "left-0" : "right-0"} flex flex-col justify-center p-2 text-gray-400 cursor-pointer select-none`} 
                onClick={onClick}>
            <span className="text-3l">{children}</span>
        </div>
    )

}