

import { useSelector } from 'react-redux'
import { RootState, store, type AppDispatch } from './state/reduxState'
import { useGetQuotesQuery } from './state/QuotesApi'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

function isFetchBaseQueryError(error: unknown): error is FetchBaseQueryError {
    return typeof error === 'object' && error != null && 'status' in error;
}

export function QuotesView() {
    const { data, error, isLoading } = useGetQuotesQuery({})
    const dispatch = store.dispatch as AppDispatch
    const items = useSelector((state: RootState) => state.cart.items)

    if (error) {
        console.error("error loading data", error)
    }
    if (isFetchBaseQueryError(error)) {
        return (
            <div>Failed to load data: {error.status}</div>
        )
    } else if (error && 'toString' in error) {
        return (
            <div>Failed to load data: {error.toString()}</div>
        )
    } else if (error) {
        return (
            <div>Failed to load data, unknown error</div>
        )
    }

    return (
        <div className="flex flex-col items-stretch gap-4">
            <h1>Quotes</h1>
            {data?.quotes.map((quote) => (
                <div className="flex flex-col gap-2 items-start p-4" key={quote.id}>
                    <div>{quote.quote}</div>
                    <div className="text-sm">{quote.author}</div>
                </div>
            ))}
            {false && (
                <>
                    <pre>
                        {items.map((item) => (
                            <div key={item.productId}>{item.productId}: {item.quantity}</div>
                        ))}
                    </pre>
                    <div>
                        <button onClick={() => { 
                            dispatch({ type: 'reduxcart/changeItem', payload: { productId: 1, quantity: 1 } })
                        }}>Add</button>
                    </div>
                </>
            )} 
        </div>
    )
}