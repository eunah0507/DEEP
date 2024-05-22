import styled from "styled-components";

export const UserProfileWrapper = styled.div`
    display: flex;
    justify-content: center;
    height: 100%;
    margin: 0 auto 200px;
    border: 1px solid #ddd;
`;

export const UserProfileContainer = styled.div`
    width: 820px;
    height: calc(100% - 60px);
    min-height: 1020px;
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

    /* nothing profile */
    .nothing_profile_container {
        padding: 200px 100px 100px;
        text-align: center;
    }

    .nothing_profile_container .nothing_profile .nothing_profile_image {
        width: 300px;
        height: 300px;
        opacity: 0.5;
        object-fit: contain;
    }

    .nothing_profile_container span {
        display: block;
        margin-top: 30px;
        color: #666;
        font-size: 2.4rem;
    }
`;
