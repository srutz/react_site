import {Link, NavLink, Outlet, useLocation, useNavigate, useParams, useSearchParams} from "react-router-dom";
import { useProducts } from "./Products";
import { ProductView } from "./ProductView"
import { useEffect, useMemo, useState} from "react"
import { Cart } from "./CartContext"
import { useWebSocketData } from "./websocket/WebSocketData"
import { ShoppingCart } from "./ShoppingCart";
import {QueryClient, QueryClientProvider, useQuery} from "@tanstack/react-query";

const queryClient = new QueryClient()

export function Menubar() {
    return (
        <div className="h-12 flex flex-row items-center gap-4 p-2 bg-gray-100 border-b border-gray-300 border-b-1">
            <div className="text-3xl">⧗</div>
            <div className="text-1xl uppercase font-bold text-orange-700">My App</div>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/websocket">Websocket</NavLink>
            <NavLink to="/products">Products</NavLink>
            <NavLink to="/imprint">Imprint</NavLink>
            <div className="grow"></div>
            <ShoppingCart/>
        </div>
    );
}


type Quote = {
    id: number,
    quote: string,
    author: string
}
type QuoteResponse = {
    total: number,
    skip: number,
    limit: number,
    quotes: Quote[]
}

async function getQuotes() {
    const r = await fetch("https://dummyjson.com/quotes?limit=3", { })
    console.log("get Quotes Part1 Finished")
    const data = await r.json() as QuoteResponse
    return data
}

async function delay(delayMs: number) {
    return new Promise((resolve, reject) => {
        setTimeout(() => { resolve(100) }, delayMs)
    })
}

function useQuotesOld() {
    const [ data, setData] = useState<Quote[]>()
    const [ isPending, setIsPending ] = useState(false)
    const [ error, setError ] = useState<any|undefined>()
    useEffect(() => { /* run code on first render / onMounted */
        (async () => {
            setIsPending(true)
            try {
                const resultData = await getQuotes()
                setData(resultData.quotes);
                await delay(3_000)
            } catch (e) {
                setError(e)
            } finally { setIsPending(false) }
        })()
    }, [])
    return { isPending, error, data }
}



export function Content() {
    const { error, data, isPending } = useQuery({
        queryKey: ['key1'],
        staleTime: 500,
        queryFn: async () => {
            const response = await fetch('https://dummyjson.com/quotes?limit=3', {})
            return await response.json() as QuoteResponse
        },
    })
    if (error) { return <div>An Error has occured</div> }
    if (isPending) { return <div>Loading...</div> }
    return (
        <div className="grow flex flex-col items-stretch justify-center pt-16">
            <pre>{JSON.stringify(data.quotes, null, 4)}</pre>
            <Outlet></Outlet>
        </div>
    )
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
    const color = params.color
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
        <QueryClientProvider client={queryClient}>
            <Cart>
                <div className="grow flex flex-col h-1">
                    <Menubar></Menubar>
                    <div className="grow flex flex-col items-stretch justify-center h-1 overflow-y-auto">
                        <Outlet></Outlet>
                    </div>
                </div>
            </Cart>
        </QueryClientProvider>
    );
}
