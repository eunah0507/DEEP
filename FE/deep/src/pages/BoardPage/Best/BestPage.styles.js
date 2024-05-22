import styled from "styled-components";
import { palette } from "../../../styles/palette";

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
        cursor: pointer;
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
        font-size: 1.6rem;
    }

    .post .user_random {
        margin-left: 7px;
        color: #999;
        font-size: 1.6rem;
    }

    /* post content */
    .post .post_title {
        margin-top: 30px;
        font-size: 1.8rem;
        font-weight: 600;
        white-space: nowrap;
        text-overflow: ellipsis;
        word-break: keep-all;
        overflow: hidden;
    }

    .post_content_container {
        overflow: hidden;
        max-height: 300px;
    }

    .post .post_content {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        line-height: 1.8;
        margin: 20px 0 30px;
        font-size: 1.6rem;
        white-space: nowrap;
        text-overflow: ellipsis;
        word-break: keep-all;
        overflow: hidden;
    }

    .post .post_content p:has(img) {
        display: none;
        line-height: 0;
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

    /* paginate */
    .paginate {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 50px;
    }

    .paginate li svg {
        width: 22px;
        height: 22px;
        cursor: pointer;
    }

    .paginate li svg:hover {
        color: ${palette.blue[7]};
    }

    .paginate .page {
        display: inline-block;
        margin: 0 10px;
        font-size: 2.2rem;
        cursor: pointer;
    }

    .paginate .page:hover {
        color: ${palette.blue[7]};
        font-weight: 500;
    }
`;
