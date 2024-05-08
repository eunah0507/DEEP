import { Link } from "react-router-dom";
import { HeaderContainer, LoginBtn, SignUpBtn } from "./Header.styles";
import headerLogo from "../../assets/images/deep-logo-header.svg";

function Header() {
    return (
        <HeaderContainer>
            <header className="wrap">
                <Link to="/">
                    <img src={headerLogo} alt="deep-logo" />
                </Link>
                <div className="buttons">
                    <LoginBtn inverted to="/login">
                        로그인
                    </LoginBtn>
                    <SignUpBtn to="/signup/terms-agree">회원가입</SignUpBtn>
                </div>
            </header>
        </HeaderContainer>
    );
}

export default Header;
