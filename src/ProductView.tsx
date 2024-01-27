// product panel that shows the product with title and image, description, price, and stock

import { Product } from "./Products"

export function ProductView({ product }: { product: Product }) {

    return <div className="w-8/12 border-solid border-2 border-indigo-100 bg-white p-3 gap-1 flex flex-col">
        <div className="text-1xl uppercase font-bold">{product.title}</div>
        <div className="self-center">
            <img className="w-auto h-64" src={product.images[0]} alt={product.title} />
        </div>
        <div className="p-top-8 h-16 pt-3 text-sm">{product.description}</div>
        <div className="flex">
            <div>{product.price.toFixed(2)} €</div>
            <div className="grow"></div>
            <div>Bestand: {product.stock}</div>
        </div>
    </div>
}