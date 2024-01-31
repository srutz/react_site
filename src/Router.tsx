import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { App, Content, Products, ProductsList, ProductDetails, WebSocketDisplay } from "./App";

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
            }
        ],
    },
]);

export function Router() {
    return <RouterProvider router={router} />
}
