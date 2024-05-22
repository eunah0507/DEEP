import styled from "styled-components";

export const MyCommentsContainer = styled.div`
    width: 820px;

    /* nothing comments */
    .nothing_comments_container {
        padding-top: 100px;
        text-align: center;
    }

    .nothing_comments {
        width: 200px;
        height: 200px;
        margin: 0 auto;
    }

    .nothing_comments img {
        width: 100%;
        height: 100%;
        object-fit: contain;
        opacity: 0.4;
    }

    .nothing_comments_container span {
        display: block;
        margin-top: 30px;
        color: #666;
        font-size: 2rem;
    }

    /* user comments */
    .user_comments {
        padding: 0 30px;
    }

    .user_comment {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        padding: 30px 0;
        border-bottom: 1px solid #ddd;
        cursor: pointer;
    }

    .user_comments li:last-child {
        border-bottom: none;
    }

    /* comment */
    .user_comment .comment {
        margin-bottom: 15px;
        font-size: 1.8rem;
        white-space: nowrap;
        text-overflow: ellipsis;
        word-break: keep-all;
        overflow: hidden;
    }

    .user_comment .user_post_title {
        color: #666;
        font-size: 1.4rem;
        white-space: nowrap;
        text-overflow: ellipsis;
        word-break: keep-all;
        overflow: hidden;
    }

    /* comment created time */
    .user_comment .contents_item .user_comment_time {
        color: #999;
        font-size: 1.6rem;
    }

    .user_comment .contents_item .user_comment_time .created_date {
        margin-right: 5px;
    }
`;
