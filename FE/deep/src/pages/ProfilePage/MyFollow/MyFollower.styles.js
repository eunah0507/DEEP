import styled from "styled-components";

export const MyFollowerWrapper = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
    overflow: hidden;
`;

export const MyFollowerContainer = styled.div`
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 500px;
    height: 700px;
    padding: 50px 30px;
    border-radius: 10px;
    background: #fff;
    overflow-y: scroll;
    z-index: 99;

    &::-webkit-scrollbar {
        width: 16px;
    }

    &::-webkit-scrollbar-thumb {
        height: 40px;
        border: 4px solid transparent;
        border-radius: 10px;
        background-color: #ddd;
        background-clip: padding-box;
    }

    /* follwer title */
    .follower_title {
        display: flex;
        justify-content: center;
        margin-bottom: 30px;
    }

    .follower_title h4 {
        display: inline-block;
        margin-right: 10px;
        font-size: 2.4rem;
        font-weight: 600;
    }

    .follower_title span {
        font-size: 2.4rem;
    }

    /* close button */
    .close_follower {
        position: absolute;
        top: 30px;
        right: 30px;
        cursor: pointer;
    }

    .close_follower svg {
        width: 40px;
        height: 40px;
        color: #333;
    }

    /* follower list */
    .follower {
        padding: 20px 0;
        border-bottom: 1px solid #eee;
        cursor: pointer;
    }

    .user_profile img {
        width: 70px;
        height: 70px;
        border: 1px solid #eee;
        border-radius: 50%;
        object-fit: cover;
    }

    .user_profile .user_info {
        margin-bottom: 10px;
        font-size: 1.6rem;
    }

    .user_profile .user_info .user_name {
        margin-left: 20px;
        margin-right: 7px;
    }

    .user_profile .user_info .user_random {
        color: #999;
    }

    .user_introduce {
        display: block;
        max-width: 350px;
        line-height: 1.5;
        margin: 0;
        margin-left: 20px;
        font-size: 1.4rem;
        white-space: nowrap;
        text-overflow: ellipsis;
        word-break: keep-all;
        overflow: hidden;
    }
`;
