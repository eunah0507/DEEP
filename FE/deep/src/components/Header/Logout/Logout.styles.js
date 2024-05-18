import styled from "styled-components";
import Button from "../../Button/Button";

export const LogoutContainer = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 1280px;
    margin: 0 auto;

    a {
        display: inline-flex;
    }

    a img {
        width: 100px;
    }
`;

export const LoginBtn = styled(Button)`
    width: 75px;
    height: 44px;
    line-height: 44px;
    margin-right: 10px;
    font-weight: 700;
`;

export const SignUpBtn = styled(Button)`
    width: 80px;
    height: 44px;
    line-height: 44px;
`;
