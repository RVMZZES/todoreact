import './App.css'
import {BlurProvider} from "./BlurContext.jsx";
import {MainPage} from "./MainPage.jsx";

function App() {
    return (
        <BlurProvider>
            <MainPage/>
        </BlurProvider>
    )
}

export default App