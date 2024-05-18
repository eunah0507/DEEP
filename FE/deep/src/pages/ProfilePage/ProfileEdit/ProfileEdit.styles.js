import styled from "styled-components";
import { palette } from "../../../styles/palette";

export const EditWrapper = styled.div`
    display: flex;
    justify-content: center;
    height: 100vh;
    margin: auto 0;
`;

export const EditContainer = styled.div`
    display: flex;
    justify-content: center;
    width: 820px;
    height: calc(100vh - 60px);
    margin-top: 60px;
    border-left: 1px solid #ddd;
    border-right: 1px solid #ddd;

    .user_profile_edit {
        width: 610px;
        margin-top: 50px;
    }

    .user_img_container {
        position: relative;
        width: 120px;
        height: 120px;
        margin: 0 auto;
    }

    .user_profile_img {
        cursor: pointer;
    }

    .user_img {
        width: 100%;
        height: 100%;
        border: 1px solid #ddd;
        border-radius: 50%;
    }

    .user_img img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        object-fit: cover;
    }

    .img_upload_icon {
        position: absolute;
        bottom: 0;
        right: 0;
        width: 35px;
        height: 35px;
    }

    .img_upload_icon svg {
        width: 100%;
        height: 100%;
        border: 5px solid #fff;
        border-radius: 50%;
        background: #fff;
        fill: ${palette.blue[1]};
    }

    .user_profile_upload {
        display: none;
    }

    .user_profile_edit .user_edit {
        margin-top: 50px;
    }

    .user_profile_edit .user_edit .text_length {
        float: right;
        color: #aaa;
        font-size: 1.6rem;
    }

    .user_nickname_edit {
        margin-bottom: 30px;
    }

    .user_nickname_edit label {
        display: inline-block;
        margin-bottom: 10px;
        font-size: 1.6rem;
    }

    .user_nickname_edit label span {
        color: ${palette.blue[5]};
        font-weight: 600;
    }

    .user_nickname_edit .noValid {
        display: none;
    }

    .user_nickname_edit.error .noValid {
        display: block;
        margin-top: 10px;
        margin-bottom: 20px;
        color: ${palette.red[7]};
        font-size: 1.4rem;
        text-indent: 5px;
    }

    .user_introduce_edit {
    }

    .user_introduce_edit label {
        display: inline-block;
        margin-bottom: 10px;
        font-size: 1.6rem;
    }

    .user_introduce_edit textarea {
        width: 100%;
        height: 200px;
        line-height: 1.5;
        padding: 20px;
        border: 1px solid #ddd;
        border-radius: 5px;
        font-size: 1.6rem;
        font-family: "Pretendard Variable", Pretendard, -apple-system,
            BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI",
            "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic",
            "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
        outline: none;
        resize: none;
    }

    .user_introduce_edit textarea:focus {
        outline: 2px solid ${palette.blue[6]};
    }

    .buttons {
        margin-top: 50px;
    }

    .buttons button:first-child {
        margin-right: 20px;
    }
`;
