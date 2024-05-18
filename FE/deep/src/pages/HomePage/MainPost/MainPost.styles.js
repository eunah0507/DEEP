import styled from "styled-components";

export const MainPostContainer = styled.li`
    margin-bottom: 20px;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 5px;

    .user_profile {
        display: flex;
        align-items: center;
        margin-bottom: 20px;
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

    .post_title {
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
