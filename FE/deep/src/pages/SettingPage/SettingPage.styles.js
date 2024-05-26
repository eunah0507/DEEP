import styled from "styled-components";
import { palette } from "../../styles/palette";

export const SettingWrapper = styled.div`
    display: flex;
    justify-content: center;
    height: 100vh;
`;

export const SettingContainer = styled.div`
    width: 610px;
    height: calc(100% - 60px);
    margin-top: 60px;
    padding: 50px 30px 0;
    border-left: 1px solid #ddd;
    border-right: 1px solid #ddd;

    .title {
        margin-bottom: 30px;
        font-size: 2.4rem;
        font-weight: 600;
    }

    .user_info_item {
        margin-bottom: 50px;
    }

    .user_info_item .setting_title {
        margin-bottom: 30px;
        font-size: 2rem;
    }

    .user_info {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 50px;
        border-bottom: 1px solid #ddd;
        font-size: 1.6rem;
    }

    .user_info:last-child {
        border-bottom: none;
    }

    .user_info span:nth-child(1) {
        font-weight: 600;
    }

    .user_info span:nth-child(2) svg {
        height: 14px;
        margin-left: 10px;
    }

    .user_setting .user_info {
        cursor: pointer;
    }
`;

export const UserSettingContainer = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.2);
    z-index: 999;

    &.hidden {
        display: none;
    }

    .user_pw_container {
        display: block;
        width: 610px;
        padding: 30px;
        border-radius: 5px;
        background: #fff;
    }

    .user_info_title {
        margin-bottom: 50px;
        text-align: center;
        font-size: 2.4rem;
        font-weight: 600;
    }

    .user_pw_title {
        display: block;
        margin-top: 30px;
        margin-bottom: 10px;
        font-size: 1.6rem;
        font-weight: 500;
    }

    .user_pw_setting .noValid {
        display: none;
    }

    .user_pw_setting.error input {
        outline: 2px solid ${palette.red[3]};
    }

    .user_pw_setting.error .noValid {
        display: block;
        margin-top: 10px;
        margin-bottom: 20px;
        color: ${palette.red[7]};
        font-size: 1.4rem;
        text-indent: 5px;
    }

    .buttons {
        margin-top: 50px;
    }

    .buttons button {
        width: 265px;
    }

    .buttons button:first-child {
        margin-right: 20px;
    }
`;
