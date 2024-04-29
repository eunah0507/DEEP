import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import MainPage from "../pages/MainPage/MainPage";
import LoginPage from "../pages/LoginPage/LoginPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import FindIdPage from "../pages/FindPage/FindIdPage";
import FindPwPage from "../pages/FindPage/FindPwPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";

function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/find-id" element={<FindIdPage />} />
                <Route path="/find-password" element={<FindPwPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </Router>
    );
}

export default AppRoutes;
