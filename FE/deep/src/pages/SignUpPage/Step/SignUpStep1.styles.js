import styled from "styled-components";
import { palette } from "../../../styles/palette";
import checked from "../../../assets/images/deep-checked.png";
import checkedGrey from "../../../assets/images/deep-checked-grey.png";

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
`;

export const TermsContainer = styled.div`
    .terms_list .terms_item {
        margin-bottom: 50px;
    }

    /* check_wrap */
    .check_wrap {
        display: flex;
        justify-content: space-between;
        width: 100%;
    }

    .check_wrap .text_wrap {
        margin-bottom: 20px;
        font-size: 2rem;
    }

    .check_wrap .text_wrap .option {
        margin-right: 8px;
        color: ${palette.blue[6]};
        font-weight: 700;
        font-style: normal;
    }

    .check_wrap input[type="checkbox"] {
        display: none;
    }

    .check_wrap label {
        display: flex;
        justify-content: space-between;
        width: 610px;
    }

    .check_wrap label::after {
        content: "";
        width: 25px;
        height: 25px;
        border: 1px solid #ddd;
        border-radius: 50%;
        background: transparent url(${checkedGrey}) no-repeat 6px 8px;
        cursor: pointer;
    }

    .check_wrap input:checked + label::after {
        content: "";
        width: 25px;
        height: 25px;
        border: 1px solid #ddd;
        border-radius: 50%;
        background: ${palette.blue[6]} url(${checked}) no-repeat 6px 8px;
    }

    /* terms_box */
    .terms_box {
        width: 100%;
        height: 200px;
        padding: 30px;
        border: 1px solid #ddd;
        border-radius: 5px;
        overflow-y: auto;
    }

    .terms_box::-webkit-scrollbar {
        width: 16px;
    }

    .terms_box::-webkit-scrollbar-thumb {
        height: 40px;
        border: 4px solid transparent;
        border-radius: 10px;
        background-color: #aaa;
        background-clip: padding-box;
    }

    .terms_box .article {
        line-height: 22px;
        margin-bottom: 20px;
        color: #999;
        font-size: 1.4rem;
    }

    .terms_box .article .article_title {
        line-height: 24px;
        margin-bottom: 10px;
        font-size: 1.5rem;
        font-weight: 600;
    }

    .terms_box .article .section {
        padding-left: 10px;
    }
`;
