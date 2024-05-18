import { Link } from "react-router-dom";
import { LogoutContainer, LoginBtn, SignUpBtn } from "./Logout.styles";
import headerLogo from "../../../assets/images/deep-logo-header.svg";

function Logout() {
    return (
        <LogoutContainer>
            <Link to="/">
                <img src={headerLogo} alt="deep-logo" />
            </Link>
            <div className="buttons">
                <LoginBtn inverted to="/login">
                    로그인
                </LoginBtn>
                <SignUpBtn to="/signup/terms-agree">회원가입</SignUpBtn>
            </div>
        </LogoutContainer>
    );
}

export default Logout;
