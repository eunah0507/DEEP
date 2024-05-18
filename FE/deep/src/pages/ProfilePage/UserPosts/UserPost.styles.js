import styled from "styled-components";

export const UserPostContainer = styled.div`
    width: 820px;

    /* user posts */
    .user_posts {
        padding: 0 30px;
    }

    .user_post {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        padding: 30px 0;
        border-bottom: 1px solid #ddd;
    }

    .user_posts li:last-child {
        border-bottom: none;
    }

    /* post title */
    .user_post .post_info .post_title {
        margin-bottom: 20px;
        font-size: 1.8rem;
        white-space: nowrap;
        text-overflow: ellipsis;
        word-break: keep-all;
        overflow: hidden;
    }

    /* post created time */
    .user_post .post_info .user_post_time {
        color: #999;
        font-size: 1.6rem;
    }

    .user_post .post_info .user_post_time .created_date {
        margin-right: 5px;
    }

    /* contents item */
    .user_post .contents_item {
        display: flex;
        color: #999;
    }

    .user_post .contents_item span {
        display: flex;
        align-items: center;
        margin-right: 7px;
    }

    .user_post .contents_item span span {
        margin-left: 7px;
        font-size: 1.4rem;
    }

    .user_post .contents_item .views svg,
    .user_post .contents_item span img {
        width: 20px;
        height: 20px;
    }
`;