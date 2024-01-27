import { useEffect, useState } from "react"


export type Product = {
    id: number
    title: string
    description: string
    price: number
    discountPercentage: number
    rating: number
    stock: number
    brand: string
    category: string
    thumbnail: string
    images: string[]
}

export type ProductsData = {
    products: Product[]
}

export function useProducts() {
    const [ products, setProducts ] = useState<Product[]>([])
    useEffect(() => {
        (async() => {
            const response = await fetch("https://dummyjson.com/products")
            const json = await response.json() as ProductsData
            setProducts(json.products)
            console.log("loaded: #" + json.products.length)
        })()
    }, [])
    return [ products ]
}