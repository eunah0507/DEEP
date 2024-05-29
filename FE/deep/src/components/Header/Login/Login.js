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
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../store/memberStore";
import Search from "../Search/Search";
import axiosInstance from "../../../apis/axiosInstance";

function Login() {
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isAlarmOpen, setIsAlarmOpen] = useState(false);
    const [alarm, setAlarm] = useState(null);

    const member = useSelector((state) => state.member.value);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        axiosInstance
            .get("/deep/connectAlert", {
                params: { memberID: member.memberID },
            })
            .then((response) => {
                console.log(response);
                console.log("알람");
                setAlarm(response);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const handleClickProfile = () => {
        setIsProfileOpen(!isProfileOpen);
    };

    const handleClickSearch = () => {
        setIsSearchOpen(!isSearchOpen);
    };

    const handleClickAlarm = () => {
        setIsAlarmOpen(!isAlarmOpen);
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
            .then((response) => {})
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
                    <div
                        className="alarm"
                        onClick={handleClickAlarm}
                        onBlur={() => setIsAlarmOpen(false)}
                        tabIndex={0}
                    >
                        <img src={alarmIcon} alt="user-alarm" />
                    </div>
                    <ul
                        className={
                            "user_alarm_container " +
                            (isAlarmOpen ? "" : "hidden")
                        }
                    >
                        <li className="user_alarm">
                            <span>ELK 적용해보신 분 계신가요?</span> 글에 새로운
                            댓글이 추가되었습니다.
                        </li>
                        <li className="user_alarm">
                            <span>ELK 적용해보신 분 계신가요?</span> 글에
                            좋아요가 추가되었습니다.
                        </li>
                        <li className="user_alarm">
                            <span>컴퓨터 구조를 왜 알아야 하는가?</span> 글에
                            새로운 댓글이 추가되었습니다.
                        </li>
                        <li className="user_alarm">
                            <span>마루는강쥐</span> 님이 회원님을 팔로우합니다.
                        </li>
                        <li className="user_alarm">
                            <span>흰둥이</span> 님이 회원님을 팔로우합니다.
                        </li>
                        <li className="user_alarm">
                            <span>컴퓨터 구조를 왜 알아야 하는가?</span> 글에
                            새로운 댓글이 추가되었습니다.
                        </li>
                        <li className="user_alarm">
                            <span>ELK 적용해보신 분 계신가요?</span> 글에 새로운
                            댓글이 추가되었습니다.
                        </li>
                        <li className="user_alarm">
                            <span>ELK 적용해보신 분 계신가요?</span> 글에 새로운
                            댓글이 추가되었습니다.
                        </li>
                    </ul>
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
