import { Link } from "react-router-dom";
import { HeaderContainer } from "./Header.styles";
import headerLogo from "../../assets/images/deep-logo-header.svg";
import Button from "../Button/Button";
import styled from "styled-components";

const LoginButton = styled(Button)`
    width: 75px;
    height: 44px;
    margin-right: 10px;
`;

const SignUpButton = styled(Button)`
    width: 80px;
    height: 44px;
`;

function Header() {
    return (
        <HeaderContainer>
            <div className="wrap">
                <Link to="/">
                    <img src={headerLogo} alt="deep-logo" />
                </Link>
                <div className="buttons">
                    <LoginButton inverted to="/login">
                        로그인
                    </LoginButton>
                    <SignUpButton to="/signup">회원가입</SignUpButton>
                </div>
            </div>
        </HeaderContainer>
    );
}

export default Header;
