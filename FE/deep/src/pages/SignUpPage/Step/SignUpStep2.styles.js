import styled from "styled-components";
import { palette } from "../../../styles/palette";

export const SignUpWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 100px 0 200px;
`;

export const SignUpContainer = styled.div`
    width: 610px;

    .logo {
        width: 100%;
        margin-bottom: 50px;
        text-align: center;
    }

    .logo img {
        width: 130px;
    }

    /* form */
    .form_item .input_title {
        display: inline-block;
        margin-bottom: 10px;
        font-size: 1.6rem;
    }

    .form_item .input_div input {
        width: 505px;
        margin-right: 20px;
    }

    /* login */
    .login {
        margin-top: 50px;
        text-align: center;
        font-size: 1.6rem;
    }

    .login span {
        margin-right: 10px;
        color: #aaa;
    }

    .login > a {
        color: ${palette.blue[6]};
        font-weight: 700;
        text-decoration: underline;
    }
`;
