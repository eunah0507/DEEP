import styled from "styled-components";
import { palette } from "../../../styles/palette";

export const PostDetailWrapper = styled.div`
    display: flex;
    justify-content: center;
    height: 100%;
    margin: 0 auto;
`;

export const PostDetailContainer = styled.div`
    width: 820px;
    height: calc(100% - 60px);
    margin-top: 110px;
    padding: 30px;
    border: 1px solid #ddd;
    border-radius: 5px;

    .post_header {
        display: flex;
        justify-content: space-between;
    }

    /* user profile */
    .user_profile {
        display: flex;
        align-items: center;
        margin-bottom: 30px;
    }

    .user_profile .user_profile_img {
        width: 50px;
        height: 50px;
        border: 1px solid #eee;
        border-radius: 50%;
        object-fit: cover;
    }

    .user_profile .user_name {
        margin-left: 15px;
        font-size: 1.6rem;
    }

    /* post menu */
    .post_menu_container {
        position: relative;
    }

    .post_menu {
        width: 25px;
        height: 25px;
        cursor: pointer;
    }

    .post_menu span {
        display: inline-block;
        width: 5px;
        height: 5px;
        border-radius: 50%;
        background: #ddd;
        margin-right: 5px;
    }

    .post_menu span:last-child {
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

    /* post content */
    .post_content_container .post_title {
        font-size: 2.2rem;
        font-weight: 600;
    }

    .post_content_container .post_content {
        margin: 30px 0 50px;
        line-height: 30px;
        font-size: 1.8rem;
    }

    .post_content_container .post_content p {
        line-height: 30px;
        word-break: keep-all;
    }

    .post_content_container .post_content img {
        width: 100%;
        object-fit: contain;
    }

    /* tags */
    .tags {
        margin-bottom: 20px;
    }

    .tags .tag {
        display: inline-block;
        padding: 7px 13px;
        margin-right: 10px;
        border: 1px solid ${palette.blue[4]};
        border-radius: 20px;
        color: ${palette.blue[7]};
        font-size: 1.4rem;
    }

    /* contents item */
    .contents_item_container {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .contents_item_container .created_time {
        color: #666;
        font-size: 1.6rem;
    }

    .contents_item_container .created_time span {
        margin-right: 7px;
    }

    .contents_item_container .contents_item span {
        display: inline-flex;
        align-items: center;
        margin-right: 15px;
    }

    .contents_item_container .contents_item span:last-child {
        margin-right: 0;
    }

    .contents_item_container .contents_item span span {
        color: #666;
        font-size: 1.4rem;
    }

    .contents_item_container .contents_item span svg {
        width: 20px;
        height: 20px;
        margin-right: 7px;
        color: #999;
    }

    .contents_item_container .contents_item span img {
        width: 20px;
        height: 20px;
        margin-right: 7px;
    }
`;

export const CommentsContainer = styled.div`
    display: flex;
    justify-content: center;
    height: 100%;
    width: 820px;
    margin: 0 auto 200px;
`;
