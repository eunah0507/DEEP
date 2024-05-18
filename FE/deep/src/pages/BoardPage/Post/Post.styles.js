import styled from "styled-components";
import { palette } from "../../../styles/palette";

export const PostListContainer = styled.li`
    width: 100%;
    margin-bottom: 30px;
    padding: 30px;
    border: 1px solid #ddd;
    border-radius: 5px;

    .post_container {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    /* user profile */
    .user_profile {
        display: flex;
        align-items: center;
    }

    .user_profile_img {
        width: 50px;
        height: 50px;
        border: 1px solid #eee;
        border-radius: 50%;
        object-fit: cover;
    }

    .user_name {
        margin-left: 10px;
        font-size: 1.4rem;
    }

    .content_time {
        color: #999;
        font-size: 1.6rem;
    }

    /* post content */
    .post_title {
        margin-top: 30px;
        font-size: 1.8rem;
        font-weight: 600;
        white-space: nowrap;
        text-overflow: ellipsis;
        word-break: keep-all;
        overflow: hidden;
    }

    .post_content {
        line-height: 1.8;
        margin: 20px 0 30px;
        font-size: 1.6rem;
        white-space: nowrap;
        text-overflow: ellipsis;
        word-break: keep-all;
        overflow: hidden;
    }

    .contents_container {
        display: flex;
        justify-content: space-between;
    }

    .tags .tag {
        display: inline;
        margin-right: 10px;
        padding: 5px 13px;
        border: 1px solid ${palette.blue[4]};
        border-radius: 15px;
        color: ${palette.blue[7]};
        font-size: 1.4rem;
        font-weight: 600;
    }

    .contents_item {
        color: #999;
        font-size: 1.4rem;
    }

    .contents_item span {
        display: inline-flex;
        align-items: center;
    }

    .contents_item .views {
        margin-right: 15px;
        font-size: 1.4rem;
    }

    .contents_item .views svg {
        width: 20px;
        height: 20px;
        margin-right: 7px;
    }

    .contents_item .likes {
        margin-right: 15px;
    }

    .contents_item .likes img {
        width: 20px;
        height: 20px;
        margin-right: 7px;
    }

    .contents_item .comments img {
        width: 20px;
        height: 20px;
        margin-right: 7px;
    }
`;
