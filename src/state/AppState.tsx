import { EventEmitter } from "events";
import { useEffect, useState } from "react";


export type AppCartItem = {
    productId: number;
    quantity: number;
}

export type AppStateType = {
    emitter: EventEmitter;
    items: AppCartItem[]
    updateCart(productId: number, quantity: number): void
}

export const appState: AppStateType = {
    emitter: new EventEmitter(),
    items: [],
    updateCart(productId: number, quantity: number) {
        let item = this.items.find(item => item.productId === productId)
        const itemFound = !!item
        if (!item) {
            item = {
                productId: productId,
                quantity: 0
            }
        }
        item.quantity += quantity
        if (item.quantity > 0 && !itemFound) {
            this.items.push(item);
        } else if (item.quantity <= 0 && itemFound) {
            this.items = this.items.filter(item => item.productId !== productId)
        }
        this.emitter.emit('update')
    }
}

export function useAppState() {
    const [ , setTrigger] = useState(false)
    useEffect(() => {
        const listener = () => {
            setTrigger(v => !v)
        }
        appState.emitter.on('update', listener)
        return () => {
            appState.emitter.off('update', listener)
        }    
    })
    return appState
}