import styled from "styled-components";
import { palette } from "../../../styles/palette";

export const NoticeWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const NoticeContainer = styled.div`
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

    /* notice */
    .notice {
        width: 100%;
        margin-bottom: 30px;
        padding: 30px;
        border: 1px solid #ddd;
        border-radius: 5px;
    }

    .notice .user_profile {
        display: flex;
        align-items: center;
    }

    .notice .user_profile_img {
        width: 50px;
        height: 50px;
        border: 1px solid #eee;
        border-radius: 50%;
        object-fit: cover;
    }

    .notice .user_name {
        margin-left: 10px;
        font-size: 1.4rem;
    }

    /* notice content */
    .notice .notice_title {
        margin-top: 30px;
        font-size: 1.8rem;
        font-weight: 600;
    }

    .notice .notice_content {
        line-height: 1.8;
        margin: 20px 0 30px;
        font-size: 1.6rem;
        white-space: nowrap;
        text-overflow: ellipsis;
        word-break: keep-all;
        overflow: hidden;
    }

    .notice .contents_container {
        display: flex;
        justify-content: space-between;
    }

    .notice .content_time {
        color: #999;
        font-size: 1.6rem;
    }

    .notice .contents_item {
        color: #999;
        font-size: 1.4rem;
    }

    .notice .contents_item span {
        display: inline-flex;
        align-items: center;
    }

    .notice .contents_item .views {
        margin-right: 15px;
        font-size: 1.4rem;
    }

    .notice .contents_item .views svg {
        width: 20px;
        height: 20px;
        margin-right: 7px;
    }

    .notice .contents_item .likes {
        margin-right: 15px;
    }

    .notice .contents_item .likes img {
        width: 20px;
        height: 20px;
        margin-right: 7px;
    }

    .notice .contents_item .comments img {
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
        color: #666;
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
        font-size: 2rem;
        cursor: pointer;
    }

    .paginate .page:hover {
        color: ${palette.blue[7]};
        font-weight: 500;
    }
`;
