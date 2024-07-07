import { createSlice, PayloadAction } from '@reduxjs/toolkit';


export type ReduxCartItem = {
    productId: number;
    quantity: number;
}

export type ReduxCartState = {
    items: ReduxCartItem[];
}

export const cartSlice = createSlice({
    initialState: {
        items: []
    } as ReduxCartState,
    name: "reduxcart",
    reducers: {
        changeItem: (state, action: PayloadAction<ReduxCartItem>) => {
            let item = state.items.find(item => item.productId === action.payload.productId)
            const itemFound = !!item
            if (!item) {
                item = {
                    productId: action.payload.productId,
                    quantity: 0
                }
            }
            item.quantity += action.payload.quantity
            if (item.quantity > 0 && !itemFound) {
                state.items.push(action.payload);
            } else if (item.quantity <= 0 && itemFound) {
                state.items = state.items.filter(item => item.productId !== action.payload.productId)
            }
        },
    }
})

