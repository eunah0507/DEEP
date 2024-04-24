import styled from "styled-components";
import { palette } from "../../styles/palette";

export const LoginContainer = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
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
    .login {
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
        text-decoration: underline;
        color: ${palette.blue[6]};
        font-weight: 600;
    }

    .orLine {
        float: left;
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        margin: 30px 0 15px;
    }

    .orLine .line {
        display: inline-block;
        width: 175px;
        height: 1px;
        background: #ddd;
    }

    .orLine .or {
        display: inline-block;
        font-size: 1.4rem;
        color: #aaa;
    }
`;
