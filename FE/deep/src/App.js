import { CookiesProvider } from "react-cookie";
import AppRoutes from "./routes/AppRoutes";

function App() {
    return (
        <CookiesProvider>
            <AppRoutes />
        </CookiesProvider>
    );
}

export default App;
