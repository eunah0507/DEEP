import { Link } from "react-router-dom";
import { LoginContainer } from "./LoginPage.styles";
import logo from "../../assets/images/deep-logo-header.svg";
import Input from "../../components/Input/Input";

function LoginPage() {
    return (
        <LoginContainer>
            <Link to="/" className="logo">
                <img src={logo} alt="deep-logo" />
            </Link>
            <Input type="text" label="아이디" placeholder="아이디" />
        </LoginContainer>
    );
}

export default LoginPage;
