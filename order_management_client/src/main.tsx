import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import {Routers} from "./routers/router.tsx";
import {Provider} from "react-redux";
import {store} from "./store.tsx";
import {NotificationProvider} from "./providers/notificationProvider.tsx";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
            <NotificationProvider>
            <Routers/>
            </NotificationProvider>
        </Provider>
    </StrictMode>,
)
