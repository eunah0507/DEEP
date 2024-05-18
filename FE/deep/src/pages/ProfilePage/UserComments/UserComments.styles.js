import styled from "styled-components";

export const CommentsContainer = styled.div`
    width: 820px;

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
