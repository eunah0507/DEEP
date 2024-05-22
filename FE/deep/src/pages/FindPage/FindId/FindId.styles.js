import styled from "styled-components";
import { palette } from "../../../styles/palette";

export const FindIdContainer = styled.div`
    width: 400px;

    /* title */
    .title {
        margin-bottom: 50px;
        text-align: center;
        font-size: 3.2rem;
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
        width: 295px;
        margin-right: 20px;
    }

    #find_id > button {
        margin-top: 30px;
    }

    /* sign up */
    .sign_up {
        margin-top: 50px;
        text-align: center;
        font-size: 1.6rem;
    }

    .sign_up span {
        margin-right: 10px;
        color: #aaa;
    }

    .sign_up > a {
        color: ${palette.blue[6]};
        font-weight: 700;
        text-decoration: underline;
    }
`;
