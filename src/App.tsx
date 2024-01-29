import { Link, Outlet, useParams } from "react-router-dom";
import { useProducts } from "./Products";
import { ProductView } from "./ProductView"
import { useContext, useMemo } from "react"
import { Cart, CartContext } from "./CartContext"
import { useWebSocketData } from "./websocket/WebSocketData"

export function Menubar() {
    const cartContext = useContext(CartContext)
    console.log("render menubar")
    console.table(cartContext)
    return (
        <div className="h-12 flex flex-row items-center gap-4 p-2 bg-gray-100 border-b border-gray-300 border-b-1">
            <div className="text-3xl">⧗</div>
            <div className="text-1xl uppercase font-bold text-orange-700">My App</div>
            <Link to="/">Home</Link>
            <Link to="/websocket">Websocket</Link>
            <Link to="/products">Products</Link>
            <div className="grow"></div>
            <div>{cartContext?.items.length}</div>
        </div>
    );
}

export function Content() {
    return (
        <div className="grow flex flex-col items-stretch justify-center">
            <div className="uppercase text-6xl font-bold text-center">The Product app</div>
            <Outlet></Outlet>
        </div>
    );
}

export function Products() {
    const [products] = useProducts();
    return (
        <div className="grow flex flex-col h-1 ">
            <div className="grow bg-white flex items-stretch h-1">
                <div className="flex flex-col p-2 gap-4">
                    <h2 className="text-1xl uppercase font-bold text-orange-700 text-center">Products</h2>
                    <div className="grow flex flex-col h-1 overflow-y-auto">
                        {products.map((p) => (
                            <Link key={p.id} to={"/products/" + p.id}>
                                <div className="m-2 uppercase text-sm text-nowrap text-ellipsis overflow-x-hidden">{p.title}</div>
                            </Link>
                        ))}
                    </div>
                </div>
                <div className="grow flex flex-col ">
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    );
}

export function ProductsList() {
    const [products_] = useProducts()
    const products = useMemo(() => products_,[products_])
    
    return (
        <div className="grow bg-white flex flex-wrap gap-2 items-center justify-center h-1 overflow-y-auto p-4">
            {products.map((p) => (
                <div key={p.id} className="bg-gray-100 h-42 p-2 border-solid border border-gray-300">
                    <Link to={"/products/" + p.id}>
                        <img className="w-auto h-40 object-cover" src={p.thumbnail} alt={p.title} />
                        <div className="text-sm font-bold text-center mt-2 text-ellipsis overflow-x-hidden">{p.title}</div>
                    </Link>
                </div>
            ))}
        </div>
    );
}

export function ProductDetails() {
    const params = useParams();
    const [products] = useProducts();
    if (!params.id) {
        return <h1>Productid not found</h1>
    }
    const id = parseInt(params.id)
    const product = products.find((p) => p.id === id);
    if (!product) {
        return <div className="grow bg-gray-100 flex flex-col items-center justify-center">
        </div>
    }
    console.log("id=" + params.id);
    return (
        <div className="grow bg-gray-100 flex flex-col items-center justify-center">
            <ProductView product={product}/>
        </div>
    );
}

export function WebSocketDisplay() {
    const data = useWebSocketData()
    return (
        <div className="grow bg-gray-100 flex flex-col items-center justify-center">
            <h1>WebSocket Data</h1>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
}

export function App() {
    return (
        <Cart>
            <div className="grow flex flex-col h-1">
                <Menubar></Menubar>
                <div className="grow flex flex-col items-stretch justify-center h-1 overflow-y-auto">
                    <Outlet></Outlet>
                </div>
            </div>
        </Cart>
    );
}
