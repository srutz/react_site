import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { App, Content, Products, ProductsList, ProductDetails, WebSocketDisplay } from "./App";
import { QuotesView } from "./Quotes";
import { AppStateView } from "./AppStateView";
import { MemoryView } from "./memory/MemoryView";
import {useEffect, useRef, useState} from "react";
import {AppState, useAppState} from "./AppState.tsx";
import {useShoppingCart} from "./ShoppingCart.tsx";

function giveMeNow() {
    console.log("giveMeNow is called")
    return new Date()
}

function Holweide() {
    const [ autoCounter, setAutoCounter ] = useState(20)
    useEffect(() => {
        const id = setInterval(() => {
            setAutoCounter(autoCounter - 1)
        }, 1_000)
        return () => {
            clearInterval(id)
        }
    }, [ autoCounter ])
    if (autoCounter <= 0) {
        return (<h1>Ihr Rabatt ist endgültig abgelaufen</h1>)
    }
    return (
        <div className="flex flex-col grow" style={{
            alignItems: "center",
            justifyContent: "center"
        }}>
            <div className="text-3xl">{autoCounter}</div>
        </div>
    )
}

export function CartView() {
    const cart = useShoppingCart()
    if (!cart || cart.items.length == 0) {
        return <div>Kauf was</div>
    }
    return (
        <div className="flex flex-col grow gap-2">
            {cart?.items.map((item, index) => (
                <div key={index}>{item.productId} / {item.quantity}</div>
            ))}
        </div>
    )
}

export function Imprint() {
    useAppState()
    const usermail = AppState.getInstance().getUsermail()
    return (
        <div className="flex flex-col grow">
            {usermail}
        </div>
    )

}

const router = createBrowserRouter([
    {
        path: "/", element: <App />,
        children: [
            {
                path: "/holweide", element: <Holweide/>,
            },
            {
                path: "/imprint", element: <Imprint/>,
            },
            {
                path: "/cart", element: <CartView/>,
            },
            {
                path: "", element: <Content></Content>,
            },
            {
                path: "websocket", element: <WebSocketDisplay></WebSocketDisplay>,
            },
            {
                path: "products", element: <Products></Products>,
                children: [
                    {
                        path: "", element: <ProductsList></ProductsList>,
                    },
                    {
                        path: ":id",  element: <ProductDetails></ProductDetails>,
                    },
                ]
            },
            {
                path: "quotes", element: <QuotesView></QuotesView>,
            },
            {
                path: "appstate", element: <AppStateView></AppStateView>
            },
            {
                path: "memory", element: <MemoryView></MemoryView>
            },

        ],
    },
]);

export function Router() {
    return <RouterProvider router={router} />
}
