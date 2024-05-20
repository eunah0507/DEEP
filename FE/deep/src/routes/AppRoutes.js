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
import SettingPage from "../pages/SettingPage/SettingPage";
import ProfilePage from "../pages/ProfilePage/ProfilePage";
import CommunityPage from "../pages/BoardPage/Community/CommunityPage";
import ProfileEdit from "../pages/ProfilePage/ProfileEdit/ProfileEdit";
import PrivateRoute from "../layout/PrivateRoute";
import PostEditor from "../pages/BoardPage/PostEditor/PostEditor";
import BestPage from "../pages/BoardPage/Best/BestPage";
import QnAPage from "../pages/BoardPage/QnA/QnAPage";
import NoticePage from "../pages/BoardPage/Notice/NoticePage";
import SkillPage from "../pages/BoardPage/Skill/SkillPage";
import PostDetail from "../pages/BoardPage/PostDetail/PostDetail";
import MyProfile from "../pages/ProfilePage/UserProfile/MyProfile";
import UserProfile from "../pages/ProfilePage/UserProfile/UserProfile";
import ScrollToTop from "../components/ScrollToTop/ScrollToTop";

function AppRoutes() {
    return (
        <Router>
            <ScrollToTop>
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
                    <Route element={<PrivateRoute />}>
                        <Route path="/home" element={<HomePage />} />
                        <Route path="/settings" element={<SettingPage />} />
                        <Route path="/profile" element={<ProfilePage />}>
                            <Route path=":id" element={<MyProfile />} />
                            <Route path=":user/:id" element={<UserProfile />} />
                            <Route path="edit" element={<ProfileEdit />} />
                        </Route>
                        <Route path="/notice" element={<NoticePage />} />
                        <Route path="/best" element={<BestPage />} />
                        <Route path="/skill" element={<SkillPage />} />
                        <Route path="/qna" element={<QnAPage />} />
                        <Route path="/community" element={<CommunityPage />} />
                        <Route path="/post/create" element={<PostEditor />} />
                        <Route
                            path="/:category/:boardNo"
                            element={<PostDetail />}
                        />
                    </Route>
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </ScrollToTop>
        </Router>
    );
}

export default AppRoutes;
