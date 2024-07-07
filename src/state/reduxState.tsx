import { configureStore } from "@reduxjs/toolkit"
import { cartSlice } from "./reduxCart"
import { quotesApi } from "./QuotesApi"


export const store = configureStore({
    reducer: {
        cart: cartSlice.reducer,
        quotesApi: quotesApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(quotesApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

