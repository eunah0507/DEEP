import { Link } from "react-router-dom";
import { SignUpContainer, SignUpWrapper } from "./SignUpSuccess.styles";
import deepLogo from "../../../assets/images/deep-logo-header.svg";
import Button from "../../../components/Button/Button";

function SignUpSuccess() {
    return (
        <SignUpWrapper>
            <SignUpContainer>
                <div className="logo">
                    <Link to="/">
                        <img src={deepLogo} alt="deep-logo" />
                    </Link>
                </div>
                <div className="sign_up_success">
                    <h3>회원가입이 완료되었습니다.</h3>
                    <span>DEEP에 오신 것을 환영합니다!</span>
                    <span>로그인 후 다양한 개발자들을 만나보세요!</span>
                </div>
                <Button mediumWidth largeFont to="/login">
                    로그인하기
                </Button>
            </SignUpContainer>
        </SignUpWrapper>
    );
}

export default SignUpSuccess;
