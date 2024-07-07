import ReactDOM from 'react-dom/client'
import './index.css'
import { Router } from './Router.tsx'

import { Provider } from 'react-redux';
import { store } from './state/reduxState.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <Router />
    </Provider>
)
