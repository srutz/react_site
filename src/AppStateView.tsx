
import { useAppState } from './state/AppState'

export function AppStateView() {

    console.log("using AppStateView")

    const appState = useAppState()

    return (
        <div className="flex flex-col gap-4">
            <pre>
                {appState.items.map((item) => (
                    <div key={item.productId}>{item.productId}: {item.quantity}</div>
                ))}
            </pre>
            <div>
                <button onClick={() => { 
                    appState.updateCart(1, 1)
                }}>Add</button>
            </div>
        </div>

    )
}