import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { App, Content, Products, ProductsList, ProductDetails, WebSocketDisplay } from "./App";
import { QuotesView } from "./Quotes";
import { AppStateView } from "./AppStateView";
import { MemoryView } from "./memory/MemoryView";

const router = createBrowserRouter([
    {
        path: "/", element: <App />,
        children: [
            {
                path: "/imprint", element: <h1>impressum</h1>,
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
