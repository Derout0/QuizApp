import '@/app/styles/index.scss'
import '@/shared/config/i18n/i18n';
import {createRoot} from "react-dom/client";
import {BrowserRouter} from "react-router-dom";

import App from "./App";

const rootElement = document.getElementById('root') as HTMLElement
const root = createRoot(rootElement)

root.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
)