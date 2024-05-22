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
    .form_item {
        margin-bottom: 20px;
    }

    .form_item .input_title {
        display: inline-block;
        margin-bottom: 10px;
        font-size: 1.6rem;
    }

    .form_item .input_div {
        height: 50px;
    }

    .form_item .input_div input {
        width: 505px;
        margin-right: 20px;
    }

    .form_item .noValid {
        display: none;
    }

    .form_item.error input {
        outline: 2px solid ${palette.red[3]};
    }

    .form_item.error .noValid {
        display: block;
        margin-top: 10px;
        margin-bottom: 20px;
        color: ${palette.red[7]};
        font-size: 1.4rem;
        text-indent: 5px;
    }

    .form_item.user_address input {
        &:disabled {
            background: transparent;
        }
    }

    .form_item.user_address_detail,
    .form_item.user_auth {
        margin-top: -10px;
    }

    .form_item.user_auth {
        position: relative;
    }

    .form_item .time_out {
        display: block;
    }

    .form_item .time_out span {
        position: absolute;
        top: 50%;
        right: 130px;
        transform: translateY(-50%);
        color: #e53935;
        font-size: 1.6rem;
        font-weight: 500;
    }

    #sign_up_form > button {
        margin-top: 30px;
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
