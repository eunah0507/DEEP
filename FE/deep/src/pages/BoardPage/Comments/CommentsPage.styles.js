import styled from "styled-components";
import { palette } from "../../../styles/palette";
import Input from "../../../components/Input/Input";

export const CommentsPageWrapper = styled.div`
    width: 100%;
    margin-top: 30px;

    .total_comments {
        font-size: 1.8rem;
        margin-bottom: 30px;
    }

    .comment_input {
        display: flex;
        justify-content: space-between;
        padding: 30px;
        border: 1px solid #ddd;
        border-bottom: none;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
    }

    .comment_input textarea {
        width: 645px;
        min-height: 90px;
        max-height: 300px;
        line-height: 1.5;
        margin-right: 28px;
        padding: 13px 20px 0;
        border: 1px solid #ddd;
        border-radius: 5px;
        font-size: 1.6rem;
        font-family: "Pretendard Variable", Pretendard, -apple-system,
            BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI",
            "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic",
            "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
        outline: none;
        resize: none;
    }

    .comment_input textarea:focus {
        outline: 2px solid ${palette.blue[6]};
    }

    .comment_input textarea::-webkit-scrollbar {
        width: 16px;
    }

    .comment_input textarea::-webkit-scrollbar-thumb {
        height: 40px;
        border: 4px solid transparent;
        border-radius: 10px;
        background-color: #ddd;
        background-clip: padding-box;
    }
`;

export const CommentInput = styled(Input)`
    height: auto;
    min-height: 50px;
    white-space: break-spaces;
    word-break: keep-all;
`;

export const CommentsPageContainer = styled.div`
    width: 100%;
    min-height: 200px;
    border: 1px solid #ddd;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;

    /* nothing comments */
    .nothing_comment_container {
        padding: 50px;
        text-align: center;
    }

    .nothing_comment_container .nothing_comment .comment_icon {
        width: 100px;
        height: 100px;
        opacity: 0.5;
    }

    .nothing_comment_container span {
        display: block;
        margin-top: 30px;
        color: #666;
        font-size: 1.6rem;
    }

    /* comments */
    .comments .comment {
        padding: 30px;
        border-bottom: 1px solid #ddd;
    }

    .comments li:last-child {
        border-bottom: none;
    }

    .comments .comment .comment_top {
        margin-bottom: 30px;
    }

    .comments .comment .comment_top {
        display: flex;
        justify-content: space-between;
    }

    /* user profile */
    .comments .comment .user_info {
        display: flex;
        align-items: center;
        cursor: pointer;
    }

    .comments .comment .user_info .user_profile_img {
        width: 50px;
        height: 50px;
        border: 1px solid #eee;
        border-radius: 50%;
        object-fit: cover;
    }

    .comments .comment .user_info .user_name {
        margin-left: 15px;
        font-size: 1.6rem;
    }

    .comments .comment .user_info .user_random {
        margin-left: 7px;
        color: #999;
        font-size: 1.6rem;
    }

    /* comment menu */
    .comment_menu_container {
        position: relative;
    }

    .comment_menu {
        width: 25px;
        height: 25px;
        cursor: pointer;
    }

    .comment_menu span {
        display: inline-block;
        width: 5px;
        height: 5px;
        border-radius: 50%;
        background: #ddd;
        margin-right: 5px;
    }

    .comment_menu span:last-child {
        margin-right: 0;
    }

    .menu {
        position: absolute;
        top: 30px;
        right: 0;
        display: block;
        width: 100px;
        border: 1px solid #ddd;
        border-radius: 5px;
    }

    .menu.hidden {
        display: none;
    }

    .menu li {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 50px;
        border-bottom: 1px solid #ddd;
        background: #fff;
        font-size: 1.6rem;
        cursor: pointer;
    }

    .menu li:last-child {
        border-bottom: none;
        color: ${palette.red[6]};
    }

    .menu li:hover {
        background: #ddd;
    }

    /* comment content */
    .comments .comment .comment_content p {
        line-height: 30px;
        font-size: 1.6rem;
        word-break: keep-all;
    }

    /* comment modify */
    .comment_modify_container {
        display: flex;
        justify-content: space-between;
    }

    .comment_modify textarea {
        width: 645px;
        min-height: 90px;
        max-height: 150px;
        line-height: 1.5;
        margin-right: 28px;
        padding: 13px 20px 0;
        border: 1px solid #ddd;
        border-radius: 5px;
        font-size: 1.6rem;
        font-family: "Pretendard Variable", Pretendard, -apple-system,
            BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI",
            "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic",
            "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
        outline: none;
        resize: none;
    }

    .comment_modify textarea:focus {
        outline: 2px solid ${palette.blue[6]};
    }

    .comment_modify textarea::-webkit-scrollbar {
        width: 16px;
    }

    .comment_modify textarea::-webkit-scrollbar-thumb {
        height: 40px;
        border: 4px solid transparent;
        border-radius: 10px;
        background-color: #ddd;
        background-clip: padding-box;
    }

    .comments .comment .comment_item {
        display: flex;
        justify-content: space-between;
        margin-top: 30px;
    }

    /* reply */
    .comments .comment .reply {
        color: ${palette.blue[6]};
        font-size: 1.6rem;
        font-weight: 500;
        cursor: pointer;
    }

    /* created time */
    .comments .comment .created_time {
        color: #666;
        font-size: 1.6rem;
    }
`;
