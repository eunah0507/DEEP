import styled from "styled-components";

export const BestWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: auto 0;
`;

export const BestContainer = styled.div`
    width: 820px;
    height: calc(100% - 60px);
    margin: 60px 0 200px;

    .board_header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 50px 0 30px;
    }

    .board_title {
        font-size: 2.4rem;
    }

    /* post */
    .post {
        width: 100%;
        margin-bottom: 30px;
        padding: 30px;
        border: 1px solid #ddd;
        border-radius: 5px;
    }

    .post .user_profile {
        display: flex;
        align-items: center;
    }

    .post .user_profile_img {
        width: 50px;
        height: 50px;
        border: 1px solid #eee;
        border-radius: 50%;
        object-fit: cover;
    }

    .post .user_name {
        margin-left: 10px;
        font-size: 1.4rem;
    }

    /* post content */
    .post .post_title {
        margin-top: 30px;
        font-size: 1.8rem;
        font-weight: 600;
    }

    .post .post_content {
        line-height: 1.8;
        margin: 20px 0 30px;
        font-size: 1.6rem;
        white-space: nowrap;
        text-overflow: ellipsis;
        word-break: keep-all;
        overflow: hidden;
    }

    .post .contents_container {
        display: flex;
        justify-content: space-between;
    }

    .post .content_time {
        color: #999;
        font-size: 1.6rem;
    }

    .post .contents_item {
        color: #999;
        font-size: 1.4rem;
    }

    .post .contents_item span {
        display: inline-flex;
        align-items: center;
    }

    .post .contents_item .views {
        margin-right: 15px;
        font-size: 1.4rem;
    }

    .post .contents_item .views svg {
        width: 20px;
        height: 20px;
        margin-right: 7px;
    }

    .post .contents_item .likes {
        margin-right: 15px;
    }

    .post .contents_item .likes img {
        width: 20px;
        height: 20px;
        margin-right: 7px;
    }

    .post .contents_item .comments img {
        width: 20px;
        height: 20px;
        margin-right: 7px;
    }
`;
