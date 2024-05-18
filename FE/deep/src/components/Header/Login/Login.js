import { Link, useNavigate } from "react-router-dom";
import {
    ContentsContainer,
    HeaderContainer,
    LoginContainer,
    NavContainer,
    UserInfoContainer,
} from "./Login.styles";
import headerLogo from "../../../assets/images/deep-logo-header.svg";
import alarmIcon from "../../../assets/images/deep-icon-alarm.svg";
import searchIcon from "../../../assets/images/deep-icon-search.svg";
import userProfile from "../../../assets/images/deep-profile-blue.png";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../store/memberStore";
import Search from "../Search/Search";
import axiosInstance from "../../../apis/axiosInstance";

function Login() {
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    const member = useSelector((state) => state.member.value);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleClickProfile = () => {
        setIsProfileOpen(!isProfileOpen);
    };

    const handleClickSearch = () => {
        setIsSearchOpen(!isSearchOpen);
    };

    const myProfile = () => {
        const random = member.memberRandom.replace("#", "");
        navigate(`/profile/${random}`);
        setIsProfileOpen(!isProfileOpen);
    };

    const userSetting = () => {
        navigate("/settings");
        setIsProfileOpen(!isProfileOpen);
    };

    const userLogout = () => {
        axiosInstance
            .get("/deep/member/logout")
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
        dispatch(logout());
        navigate("/");
    };

    return (
        <LoginContainer>
            <HeaderContainer>
                <Link to="/home">
                    <img src={headerLogo} alt="deep-logo" />
                </Link>
                <NavContainer>
                    <ul className="gnb">
                        <li className="menu">
                            <Link to="/notice">공지사항</Link>
                        </li>
                        <li className="menu">
                            <Link to="/best">인기글</Link>
                        </li>
                        <li className="menu">
                            <Link to="/skill">기술 트렌드</Link>
                        </li>
                        <li className="menu">
                            <Link to="/qna">QnA</Link>
                        </li>
                        <li className="menu">
                            <Link to="/community">커뮤니티</Link>
                        </li>
                    </ul>
                </NavContainer>
            </HeaderContainer>
            <UserInfoContainer>
                <ContentsContainer>
                    <div className="search" onClick={handleClickSearch}>
                        <img src={searchIcon} alt="search-information" />
                    </div>
                    <div className="alarm">
                        <img src={alarmIcon} alt="user-alarm" />
                    </div>
                </ContentsContainer>
                <div
                    className="user_profile"
                    onClick={handleClickProfile}
                    onBlur={() => setIsProfileOpen(false)}
                    tabIndex={0}
                >
                    {member.memberFile === "" ? (
                        <img src={userProfile} alt="user-profile-image" />
                    ) : (
                        <img src={member.memberFile} alt="user-profile-image" />
                    )}
                </div>
                <ul
                    className={
                        "user_info_menu " + (isProfileOpen ? "" : "hidden")
                    }
                >
                    <li className="user_menu" onMouseDown={myProfile}>
                        내 프로필
                    </li>
                    <li className="user_menu" onMouseDown={userSetting}>
                        설정
                    </li>
                    <li className="user_menu" onMouseDown={userLogout}>
                        로그아웃
                    </li>
                </ul>
            </UserInfoContainer>
            {isSearchOpen ? (
                <Search setIsSearchOpen={(open) => setIsSearchOpen(open)} />
            ) : (
                <></>
            )}
        </LoginContainer>
    );
}

export default Login;
