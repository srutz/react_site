import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { App, Content, Products, ProductsList, ProductDetails } from "./App";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "",
                element: <Content></Content>,
            },
            {
                path: "products",
                element: <Products></Products>,
                children: [
                    {
                        path: "",
                        element: <ProductsList></ProductsList>,
                    },
                    {
                        path: ":id",
                        element: <ProductDetails></ProductDetails>,
                    },
                ]
            }
        ],
    },
]);

export function Router() {
    return <RouterProvider router={router} />
}
