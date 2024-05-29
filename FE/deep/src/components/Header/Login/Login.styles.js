import styled from "styled-components";
import { palette } from "../../../styles/palette";

export const LoginContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 1280px;
    margin: 0 auto;
`;

export const HeaderContainer = styled.div`
    display: flex;
    align-items: center;

    a {
        display: inline-block;
    }

    a img {
        width: 100px;
    }
`;

export const NavContainer = styled.div`
    float: right;
    margin-left: 20px;

    .gnb {
        height: 60px;
        line-height: 60px;
    }

    .gnb .menu {
        margin-right: 20px;
        float: left;
        font-size: 1.6rem;
    }

    .gnb .menu:last-child {
        margin-right: 0;
    }

    .gnb .menu a {
        display: inline-block;
        font-weight: 600;
        transition: all 0.2s;
    }

    .gnb .menu a:hover {
        color: ${palette.blue[7]};
        font-weight: 600;
    }
`;

export const ContentsContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    div {
        width: 30px;
        height: 30px;
        margin-right: 25px;
        cursor: pointer;
    }

    div img {
        width: 100%;
        height: 100%;
    }

    .user_alarm_container {
        position: absolute;
        top: 50px;
        right: 55px;
        width: 250px;
        height: 300px;
        max-height: 300px;
        padding: 10px 20px;
        border: 1px solid #ddd;
        border-radius: 5px;
        background: #fff;
        box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
        overflow-x: hidden;
        overflow-y: auto;
        z-index: 99;
    }

    .user_alarm_container::-webkit-scrollbar {
        width: 16px;
    }

    .user_alarm_container::-webkit-scrollbar-thumb {
        height: 40px;
        border: 4px solid transparent;
        border-radius: 10px;
        background-color: #ddd;
        background-clip: padding-box;
    }

    .user_alarm_container.hidden {
        display: none;
    }

    .user_alarm {
        line-height: 1.5;
        padding: 10px 0;
        border-bottom: 1px solid #ddd;
        font-size: 1.4rem;
    }

    .user_alarm_container li:last-child {
        border-bottom: none;
    }

    .user_alarm span {
        font-weight: 600;
    }
`;

export const UserInfoContainer = styled.div`
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .user_profile {
        width: 40px;
        height: 40px;
        cursor: pointer;
    }

    .user_profile img {
        width: 100%;
        height: 100%;
        border: 1px solid #eee;
        border-radius: 50%;
        object-fit: cover;
    }

    .user_info_menu {
        position: absolute;
        top: 50px;
        right: 0;
        width: 190px;
        border: 1px solid #ddd;
        border-radius: 5px;
        background: #fff;
        box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
        z-index: 99;
    }

    .user_info_menu.hidden {
        display: none;
    }

    .user_info_menu .user_menu {
        height: 40px;
        line-height: 40px;
        border-bottom: 1px solid #ddd;
        text-align: center;
        font-size: 1.4rem;
        font-weight: 600;
        transition: all 0.2s;
        cursor: pointer;
    }

    .user_info_menu .user_menu:hover {
        background: #f3f3f3;
    }

    .user_info_menu .user_menu:last-child {
        border-bottom: none;
        color: ${palette.red[6]};
    }
`;
