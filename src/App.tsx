import { Route, Routes } from 'react-router-dom'
import {MainPage} from "@/pages/MainPage/MainPage";

const App = () => {
    return <div>
        <Routes>
            <Route path={'/main'} element={<MainPage />} />
        </Routes>
    </div>
}

export default App