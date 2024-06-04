import {AppRouter} from "@/app/providers/router";
import {Suspense} from "react";

const App = () => {
    return <div>
        <Suspense fallback={<div>Loading for language...</div>}>
            <AppRouter />
        </Suspense>
    </div>
}

export default App