import styled from "styled-components";

export const SettingWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: auto 0;
`;

export const SettingContainer = styled.div`
    width: 610px;
    height: calc(100vh - 60px);
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

    .user_info_item .setting_title ul {
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
`;
