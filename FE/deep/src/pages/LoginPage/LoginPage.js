import { Link, useNavigate } from "react-router-dom";
import {
    LoginContainer,
    KakaoLoginBtn,
    NaverLoginBtn,
    GoogleLoginBtn,
    LoginWrapper,
} from "./LoginPage.styles";
import deepLogo from "../../assets/images/deep-logo-header.svg";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import kakaoLogo from "../../assets/images/deep-kakao-logo.svg";
import naverLogo from "../../assets/images/deep-naver-logo.svg";
import googleLogo from "../../assets/images/deep-google-logo.svg";
import { useState } from "react";
import axiosInstance from "../../apis/axiosInstance";
import { useDispatch } from "react-redux";
import { login } from "../../store/memberStore";
import { GiConsoleController } from "react-icons/gi";

function LoginPage() {
    const [id, setId] = useState("");
    const [pw, setPw] = useState("");

    const [isId, setIsId] = useState(false);
    const [isPw, setIsPw] = useState(false);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const handleCheckId = (e) => {
        setId(e.target.value);

        const regex = /^[a-z0-9]{4,20}$/;

        if (regex.test(e.target.value)) {
            setIsId(true);
        } else {
            setIsId(false);
        }
    };

    const handleCheckPw = (e) => {
        setPw(e.target.value);

        const regex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*?_.,]).{8,16}$/;

        if (regex.test(e.target.value)) {
            setIsPw(true);
        } else {
            setIsPw(false);
        }
    };

    const userLogin = () => {
        if (id === "") {
            alert("아이디를 입력해 주세요.");
        } else if (pw === "") {
            alert("비밀번호를 입력해 주세요.");
        } else {
            fetchData();
        }
    };

    const loginInfo = {
        memberID: id,
        memberPass: pw,
    };

    const fetchData = async () => {
        await axiosInstance
            .post("/deep/member/login", loginInfo)
            .then((response) => {
                axiosInstance
                    .get("/deep/member/info")
                    .then((response) => {
                        const data = response.data;

                        if (data.memberFile === null) {
                            data.memberFile = "";
                        }

                        if (data.memberIntroduce === null) {
                            data.memberIntroduce = "";
                        }

                        const payload = {
                            isAuthorized: true,
                            memberNickName: data.memberNickName,
                            memberRandom: data.memberRandom,
                            memberFile: data.memberFile,
                            memberIntroduce: data.memberIntroduce,
                        };

                        dispatch(login(payload));
                        navigate("/home");
                    })
                    .catch((error) => {
                        console.log(error);
                        alert(
                            "회원님의 정보를 불러올 수 없습니다.\n다시 로그인 해 주세요."
                        );
                    });
            })
            .catch((error) => {
                console.log(error);
                alert("아이디 또는 비밀번호를 다시 확인해 주세요.");
            });
    };

    const handleLoginEnter = (e) => {
        if (e.key === "Enter") {
            userLogin();
        }
    };

    const socialLogin = async (params) => {
        const authURL = `https://dev.deeep.site/deep/member/login/${params}`;
        window.location.href = authURL;

        await axiosInstance
            .get("/deep/member/info")
            .then((response) => {
                const data = response.data;

                if (data.memberFile === null) {
                    data.memberFile = "";
                }

                if (data.memberIntroduce === null) {
                    data.memberIntroduce = "";
                }

                const payload = {
                    isAuthorized: true,
                    memberNickName: data.memberNickName,
                    memberRandom: data.memberRandom,
                    memberFile: data.memberFile,
                    memberIntroduce: data.memberIntroduce,
                };

                dispatch(login(payload));
                navigate("/home");
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <LoginWrapper>
            <LoginContainer>
                <div className="logo">
                    <Link to="/">
                        <img src={deepLogo} alt="deep-logo" />
                    </Link>
                </div>
                <div className="login_form">
                    <Input
                        type="text"
                        label="아이디"
                        value={id}
                        maxLength="20"
                        placeholder="아이디"
                        onChange={handleCheckId}
                    />
                    <Input
                        type="password"
                        label="비밀번호"
                        value={pw}
                        maxLength="16"
                        placeholder="비밀번호"
                        onChange={handleCheckPw}
                        onKeyPress={handleLoginEnter}
                    />
                    <Button mediumWidth onClick={userLogin}>
                        로그인
                    </Button>
                </div>
                <div className="member">
                    <div className="find">
                        <Link to="/find-id">아이디 찾기</Link>
                        <Link to="/find-password">비밀번호 찾기</Link>
                    </div>
                    <div className="signUp">
                        <Link to="/signup/terms-agree">회원가입</Link>
                    </div>
                </div>
                <div className="horizon">
                    <span className="line"></span>
                    <span className="or">또는</span>
                    <span className="line"></span>
                </div>
                <KakaoLoginBtn mediumWidth onClick={() => socialLogin("kakao")}>
                    <img src={kakaoLogo} alt="kakao-logo" />
                    <span>카카오로 로그인하기</span>
                </KakaoLoginBtn>
                <NaverLoginBtn mediumWidth onClick={() => socialLogin("naver")}>
                    <img src={naverLogo} alt="naver-logo" />
                    <span>네이버로 로그인하기</span>
                </NaverLoginBtn>
                <GoogleLoginBtn
                    mediumWidth
                    inverted
                    onClick={() => socialLogin("google")}
                >
                    <img src={googleLogo} alt="google-logo" />
                    <span>구글로 로그인하기</span>
                </GoogleLoginBtn>
            </LoginContainer>
        </LoginWrapper>
    );
}

export default LoginPage;
