import styled from "styled-components";

export const MainPostContainer = styled.li`
    margin-bottom: 20px;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 5px;
    cursor: pointer;

    .post_container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
    }

    /* user profile */
    .user_profile {
        display: flex;
        align-items: center;
        cursor: pointer;
    }

    .user_profile img {
        width: 30px;
        height: 30px;
        border: 1px solid #eee;
        border-radius: 50%;
        object-fit: cover;
    }

    .user_profile .user_name {
        margin-left: 10px;
        font-size: 1.4rem;
    }

    .user_profile .user_random {
        margin-left: 7px;
        color: #999;
        font-size: 1.4rem;
    }

    .content_time {
        color: #999;
        font-size: 1.4rem;
    }

    /* post title */
    .post_title {
        margin-bottom: 20px;
        font-size: 1.6rem;
        font-weight: 500;
        white-space: nowrap;
        text-overflow: ellipsis;
        word-break: keep-all;
        overflow: hidden;
    }

    /* post contents item */
    .contents_item {
        display: flex;
        justify-content: end;
        align-items: center;
    }

    .contents_item .likes {
        display: inline-flex;
    }

    .contents_item .likes img {
        width: 20px;
        height: 20px;
        margin-right: 7px;
    }

    .contents_item .likes span {
        margin-right: 15px;
        color: #999;
        font-size: 1.4rem;
    }

    .contents_item .comments {
        display: inline-flex;
    }

    .contents_item .comments img {
        width: 20px;
        height: 20px;
        margin-right: 7px;
    }

    .contents_item .comments span {
        color: #999;
        font-size: 1.4rem;
    }
`;
