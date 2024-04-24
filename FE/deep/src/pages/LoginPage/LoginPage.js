import { Link } from "react-router-dom";
import { LoginContainer } from "./LoginPage.styles";
import deepLogo from "../../assets/images/deep-logo-header.svg";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import styled from "styled-components";
import kakaoLogo from "../../assets/images/deep-kakao-logo.svg";
import naverLogo from "../../assets/images/deep-naver-logo.svg";
import googleLogo from "../../assets/images/deep-google-logo.svg";

const KakaoLogin = styled(Button)`
    margin-bottom: 15px;
    background: #fae100;
    color: #000;
    font-weight: 500;

    &:hover {
        background: #fae100;
    }

    img {
        height: 16px;
        margin-right: 10px;
    }
`;

const NaverLogin = styled(Button)`
    margin-bottom: 15px;
    background: #03c75a;

    &:hover {
        background: #03c75a;
    }

    img {
        height: 16px;
        margin-right: 10px;
    }
`;

const GoogleLogin = styled(Button)`
    font-weight: 500;

    &:hover {
        background: #fff;
    }

    img {
        height: 16px;
        margin-right: 10px;
    }
`;

function LoginPage() {
    return (
        <LoginContainer>
            <div className="logo">
                <Link to="/">
                    <img src={deepLogo} alt="deep-logo" />
                </Link>
            </div>
            <div className="login">
                <Input type="text" label="아이디" placeholder="아이디" />
                <Input
                    type="password"
                    label="비밀번호"
                    placeholder="비밀번호"
                />
                <Button mediumWidth>로그인</Button>
            </div>
            <div className="member">
                <div className="find">
                    <Link to="/find-id">아이디 찾기</Link>
                    <Link to="/find-password">비밀번호 찾기</Link>
                </div>
                <div className="signUp">
                    <Link to="/signup">회원가입</Link>
                </div>
            </div>
            <div className="orLine">
                <span className="line"></span>
                <span className="or">또는</span>
                <span className="line"></span>
            </div>
            <KakaoLogin mediumWidth>
                <img src={kakaoLogo} alt="kakao-logo" />
                <span>카카오로 로그인하기</span>
            </KakaoLogin>
            <NaverLogin mediumWidth>
                <img src={naverLogo} alt="naver-logo" />
                <span>네이버로 로그인하기</span>
            </NaverLogin>
            <GoogleLogin mediumWidth inverted>
                <img src={googleLogo} alt="google-logo" />
                <span>구글로 로그인하기</span>
            </GoogleLogin>
        </LoginContainer>
    );
}

export default LoginPage;
