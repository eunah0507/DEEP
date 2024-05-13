import styled from "styled-components";

export const ProfileWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: auto 0;
`;

export const ProfileContainer = styled.div`
    width: 820px;
    height: calc(100vh - 60px);
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
        border-radius: 50%;
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

    .user_profile_info button {
    }

    /* user contents */
    .user_contents {
    }

    .user_contents ul {
        display: flex;
        align-items: center;
        width: 100%;
        height: 50px;
        border-bottom: 1px solid #ddd;
    }

    .user_contents ul li {
        width: 33%;
        height: 50px;
        line-height: 50px;
        text-align: center;
        font-size: 1.6rem;
    }

    .user_contents ul li.selected {
        border-bottom: 3px solid #1e88e5;
    }

    .user_contents_item {
        padding: 0 30px;
    }
`;
