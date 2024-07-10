import {Link, NavLink, Outlet, useLocation, useNavigate, useParams, useSearchParams} from "react-router-dom";
import { useProducts } from "./Products";
import { ProductView } from "./ProductView"
import {ReactNode, useMemo} from "react"
import { Cart } from "./CartContext"
import { useWebSocketData } from "./websocket/WebSocketData"
import { ShoppingCart } from "./ShoppingCart";
import {TransitionLink} from "./TransitionLink.tsx";
import {AppState, useAppState} from "./AppState.tsx";
import {Imprint} from "./Router.tsx";


export function Menubar() {
    return (
        <div className="h-12 flex flex-row items-center gap-4 p-2 bg-gray-100 border-b border-gray-300 border-b-1">
            <div className="text-3xl">⧗</div>
            <div className="text-1xl uppercase font-bold text-orange-700">My App</div>
            <TransitionLink title="Home Link" to="/">Home</TransitionLink>
            <TransitionLink title="abc" to="/products">Products</TransitionLink>
            <TransitionLink to="/quotes">Quotes</TransitionLink>
            <TransitionLink to="/imprint" >Imprint</TransitionLink>
            <div className="grow"></div>
            <ShoppingCart/>
        </div>
    );
}

export function Content() {
    useAppState()
    return (
        <div className="grow flex flex-col items-stretch justify-center">
            <div className="uppercase text-6xl font-bold text-center">The Product app</div>
            <Outlet></Outlet>
            <button onClick={() => {
                AppState.getInstance().setUsermail("frank123@tomas.de")
            }}>Change Username</button>
            <div>Username: {AppState.getInstance().getUsermail()}</div>
            <Imprint></Imprint>
        </div>
    );
}

export function LeftRightContainer(props: { left: ReactNode, right: ReactNode }) {
    return (
        <>
            <div className="flex flex-col p-2 gap-4">
                <h2 className="text-1xl uppercase font-bold text-orange-700 text-center">Products</h2>
                <div className="grow flex flex-col h-1 overflow-y-auto">
                    {props.left}
                </div>
            </div>
            <div className="grow flex flex-col ">
                {props.right}
            </div>
        </>
    )
}

export function Products() {
    const [products] = useProducts();
    return (
        <div className="grow flex flex-col h-1 ">
            <div className="grow bg-white flex items-stretch h-1">
                <LeftRightContainer
                    left={products.map((p) => (
                        <Link key={p.id} to={"/products/" + p.id}>
                            <div
                                className="m-2 select-none uppercase text-sm text-nowrap text-ellipsis overflow-x-hidden">{p.title}</div>
                        </Link>
                    ))}
                    right={<Outlet></Outlet>} />
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
    const color = params.color
    console.log(id, color)
    const product = products.find((p) => p.id === id);
    if (!product) {
        return <div className="grow bg-gray-100 flex flex-col items-center justify-center">
        </div>
    }
    console.log("id=" + params.id);
    return (
        <div className="grow bg-gray-100 flex flex-col items-center justify-center">
            <ProductView product={product} />
        </div>
    );
}

export function WebSocketDisplay() {
    const data = useWebSocketData()
    return (
        <div className="grow bg-gray-100 flex flex-col items-center justify-center">
            <h1 className="text-2xl">WebSocket Data</h1>
            <pre>{data}</pre>
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
