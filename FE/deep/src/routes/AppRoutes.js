import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import MainPage from "../pages/MainPage/MainPage";
import LoginPage from "../pages/LoginPage/LoginPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import FindPwPage from "../pages/FindPage/FindPwPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import FindId from "../pages/FindPage/FindId/FindId";
import FindIdSuccess from "../pages/FindPage/FindId/FindIdSuccess";
import FindIdPage from "../pages/FindPage/FindIdPage";
import FindPw from "../pages/FindPage/FindPw/FindPw";
import FindPwSuccess from "../pages/FindPage/FindPw/FindPwSuccess";
import SignUpStep1 from "../pages/SignUpPage/Step/SignUpStep1";
import SignUpStep2 from "../pages/SignUpPage/Step/SignUpStep2";
import SignUpSuccess from "../pages/SignUpPage/Step/SignUpSuccess";
import HomePage from "../pages/HomePage/HomePage";

function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignUpPage />}>
                    <Route path="terms-agree" element={<SignUpStep1 />} />
                    <Route path="info" element={<SignUpStep2 />} />
                    <Route path="success" element={<SignUpSuccess />} />
                </Route>
                <Route path="/find-id" element={<FindIdPage />}>
                    <Route index element={<FindId />} />
                    <Route path="done" element={<FindIdSuccess />} />
                </Route>
                <Route path="/find-password" element={<FindPwPage />}>
                    <Route index element={<FindPw />} />
                    <Route path="reset" element={<FindPwSuccess />} />
                </Route>
                <Route path="/home" element={<HomePage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </Router>
    );
}

export default AppRoutes;
