import { Link } from "react-router-dom";
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

function LoginPage() {
    return (
        <LoginWrapper>
            <LoginContainer>
                <div className="logo">
                    <Link to="/">
                        <img src={deepLogo} alt="deep-logo" />
                    </Link>
                </div>
                <div className="login_form">
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
                <div className="horizon">
                    <span className="line"></span>
                    <span className="or">또는</span>
                    <span className="line"></span>
                </div>
                <KakaoLoginBtn mediumWidth>
                    <img src={kakaoLogo} alt="kakao-logo" />
                    <span>카카오로 로그인하기</span>
                </KakaoLoginBtn>
                <NaverLoginBtn mediumWidth>
                    <img src={naverLogo} alt="naver-logo" />
                    <span>네이버로 로그인하기</span>
                </NaverLoginBtn>
                <GoogleLoginBtn mediumWidth inverted>
                    <img src={googleLogo} alt="google-logo" />
                    <span>구글로 로그인하기</span>
                </GoogleLoginBtn>
            </LoginContainer>
        </LoginWrapper>
    );
}

export default LoginPage;
