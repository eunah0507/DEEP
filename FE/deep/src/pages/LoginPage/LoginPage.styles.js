import styled from "styled-components";
import Button from "../../components/Button/Button";
import { palette } from "../../styles/palette";

export const LoginWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: auto 0;
`;

export const LoginContainer = styled.div`
    width: 400px;

    /* logo */
    .logo {
        width: 100%;
        margin-bottom: 50px;
        text-align: center;
    }

    .logo img {
        width: 130px;
    }

    /* login */
    .login_form {
        margin-bottom: 20px;
    }

    /* member */
    .member {
        font-size: 1.4rem;
    }

    .find {
        float: left;
    }

    .find > a {
        margin-right: 10px;
    }

    .signUp {
        float: right;
    }

    .signUp > a {
        color: ${palette.blue[6]};
        font-weight: 600;
        text-decoration: underline;
    }

    .horizon {
        float: left;
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        margin: 30px 0 15px;
    }

    .horizon .line {
        display: inline-block;
        width: 175px;
        height: 1px;
        background: #ddd;
    }

    .horizon .or {
        display: inline-block;
        font-size: 1.4rem;
        color: #aaa;
    }
`;

export const KakaoLoginBtn = styled(Button)`
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

export const NaverLoginBtn = styled(Button)`
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

export const GoogleLoginBtn = styled(Button)`
    font-weight: 500;

    &:hover {
        background: #fff;
    }

    img {
        height: 16px;
        margin-right: 10px;
    }
`;
