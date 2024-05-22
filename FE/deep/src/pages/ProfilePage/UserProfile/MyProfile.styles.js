import styled from "styled-components";

export const MyProfileWrapper = styled.div`
    display: flex;
    justify-content: center;
    height: 100%;
    margin: 0 auto 200px;
    border: 1px solid #ddd;
`;

export const MyProfileContainer = styled.div`
    width: 820px;
    height: calc(100% - 60px);
    margin-top: 60px;
    border-left: 1px solid #ddd;
    border-right: 1px solid #ddd;

    .user_profile_info {
        width: 100%;
        padding: 50px;
    }

    .user_profile_item {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    /* user profile */
    .user_profile {
        display: flex;
        align-items: center;
    }

    .user_profile img {
        width: 120px;
        height: 120px;
        border: 1px solid #ddd;
        border-radius: 50%;
        object-fit: cover;
    }

    .user_profile .user_nickName {
        margin-left: 30px;
        margin-right: 5px;
        font-size: 2.4rem;
    }

    .user_profile .user_number {
        color: #666;
        font-size: 2rem;
    }

    /* user follow */
    .user_follow div {
        float: left;
        text-align: center;
    }

    .user_follow div span {
        display: block;
    }

    .user_follow div span:first-child {
        font-size: 2.4rem;
    }

    .user_follow div span:last-child {
        font-size: 2rem;
    }

    .user_followers {
        margin-right: 50px;
    }

    /* user introduce */
    .user_introduce {
        margin: 50px 0;
    }

    .user_introduce span {
        font-size: 2rem;
    }

    .user_profile_info a {
        display: flex;
        margin: 0 auto;
    }

    /* user contents */
    .user_contents_menu .user_contents_item {
        display: flex;
        align-items: center;
        width: 100%;
        height: 50px;
        border-bottom: 1px solid #ddd;
    }

    .user_contents_menu .user_contents_item li {
        width: 33%;
        height: 50px;
        line-height: 50px;
        text-align: center;
        font-size: 1.6rem;
        cursor: pointer;
    }

    .user_contents_menu .user_contents_item li.selected {
        border-bottom: 3px solid #1e88e5;
    }

    .user_contents_item {
        padding: 0 30px;
    }

    .user_contents_container {
        height: 500px;
        min-height: 500px;
        overflow-x: hidden;
        overflow-y: auto;
    }

    .user_contents_container::-webkit-scrollbar {
        width: 16px;
    }

    .user_contents_container::-webkit-scrollbar-thumb {
        height: 40px;
        border: 4px solid transparent;
        border-radius: 10px;
        background-color: #ddd;
        background-clip: padding-box;
    }
`;
