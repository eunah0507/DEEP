import { useSelector } from "react-redux";
import { HeaderWrapper } from "./Header.styles";
import Login from "./Login/Login";
import Logout from "./Logout/Logout";

function Header() {
    const member = useSelector((state) => state.member.value);

    return (
        <HeaderWrapper>
            {member.isAuthorized ? <Login /> : <Logout />}
        </HeaderWrapper>
    );
}

export default Header;
