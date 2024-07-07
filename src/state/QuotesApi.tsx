
// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export type Quote = {
    id: number
    quote: string
    author: string
}

export type QuoteResponse = {
    quotes: Quote[]
    total: number
    skip: number
    limit: number
}

// Define a service using a base URL and expected endpoints
export const quotesApi = createApi({
    reducerPath: "quotesApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com/" }),
    endpoints: (builder) => ({
        getQuotes: builder.query<QuoteResponse,{ limit?: number, skip?: number}>({
            query: (args) => `quotes?limit=${args.limit ?? 100}&skip=${args.skip ?? 0}`,
        }),
    }),
})


export const { useGetQuotesQuery } = quotesApi

