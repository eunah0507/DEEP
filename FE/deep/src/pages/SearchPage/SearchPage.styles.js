import styled from "styled-components";
import { palette } from "../../styles/palette";

export const SearchPageWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const SearchPageContainer = styled.div`
    width: 820px;
    max-width: 820px;
    height: calc(100% - 60px);
    margin: 60px 0 200px;
`;

export const UserSearchContainer = styled.div`
    width: 100%;
    margin-top: 50px;

    .user_search_title {
        display: inline-block;
        margin-bottom: 50px;
        font-size: 2.4rem;
    }

    .user_search_count {
        margin-left: 10px;
        font-size: 2.4rem;
        font-weight: 600;
    }

    /* user nothing */
    .search_nothing_container {
        text-align: center;
    }

    .search_nothing img {
        width: 400px;
        height: 400px;
        opacity: 0.5;
        object-fit: contain;
    }

    .search_nothing_container span {
        display: block;
        margin-top: 30px;
        color: #666;
        font-size: 2.4rem;
    }

    /* search user profile */
    .user_profile_container {
        margin-bottom: 30px;
        padding: 30px;
        border: 1px solid #ddd;
        border-radius: 5px;
        cursor: pointer;
    }

    .user_search_result li:last-child {
        margin-bottom: 0;
    }

    .user_profile_container .user_profile {
        display: flex;
        align-items: center;
        margin-bottom: 30px;
        font-size: 1.6rem;
    }

    .user_profile_container .user_profile img {
        width: 85px;
        height: 85px;
        border: 1px solid #eee;
        border-radius: 50%;
    }

    .user_profile_container .user_name {
        margin-left: 15px;
        margin-right: 7px;
    }

    .user_profile_container .user_random {
        color: #999;
    }

    .user_introduce_container .user_introduce {
        font-size: 1.6rem;
    }
`;

export const TextSearchContainer = styled.div`
    width: 100%;
    margin-top: 50px;

    .text_search_title {
        display: inline-block;
        margin-bottom: 50px;
        font-size: 2.4rem;
    }

    .text_search_count {
        margin-left: 10px;
        font-size: 2.4rem;
        font-weight: 600;
    }

    /* search nothing */
    .search_nothing_container {
        text-align: center;
    }

    .search_nothing img {
        width: 400px;
        height: 400px;
        opacity: 0.5;
        object-fit: contain;
    }

    .search_nothing_container span {
        display: block;
        margin-top: 30px;
        color: #666;
        font-size: 2.4rem;
    }

    /* search post */
    .post_container {
        margin-bottom: 30px;
        padding: 30px;
        border: 1px solid #ddd;
        border-radius: 5px;
        cursor: pointer;
    }

    .text_search_result li:last-child {
        margin-bottom: 0;
    }

    .user_profile {
        margin-bottom: 30px;
        font-size: 1.6rem;
    }

    .user_profile .user_random {
        margin-left: 7px;
        color: #999;
    }

    .post_content_container {
        margin-bottom: 30px;
    }

    .post_content_container .post_title {
        margin-bottom: 30px;
        font-size: 1.8rem;
        font-weight: 600;
    }

    .post_content_container .post_content p {
        line-height: 30px;
        font-size: 1.6rem;
    }

    .post_content_container .post_content p:has(img) {
        display: none;
        line-height: 0;
    }

    .contents_container {
        display: flex;
        justify-content: space-between;
    }

    .tags .tag {
        display: inline-block;
        margin-right: 10px;
        padding: 7px 13px;
        border: 1px solid ${palette.blue[6]};
        border-radius: 20px;
        color: ${palette.blue[6]};
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
        margin-right: 15px;
    }

    .contents_item span:last-child {
        margin-right: 0;
    }

    .contents_item span svg {
        width: 20px;
        height: 20px;
        margin-right: 7px;
    }

    .contents_item span img {
        width: 20px;
        height: 20px;
        margin-right: 7px;
    }
`;

export const TagSearchContainer = styled.div`
    width: 100%;
    margin-top: 50px;

    .text_search_title {
        display: inline-block;
        margin-bottom: 50px;
        font-size: 2.4rem;
    }

    .text_search_count {
        margin-left: 10px;
        font-size: 2.4rem;
        font-weight: 600;
    }

    /* search nothing */
    .search_nothing_container {
        text-align: center;
    }

    .search_nothing img {
        width: 400px;
        height: 400px;
        opacity: 0.5;
        object-fit: contain;
    }

    .search_nothing_container span {
        display: block;
        margin-top: 30px;
        color: #666;
        font-size: 2.4rem;
    }

    /* search post */
    .post_container {
        margin-bottom: 30px;
        padding: 30px;
        border: 1px solid #ddd;
        border-radius: 5px;
        cursor: pointer;
    }

    .text_search_result li:last-child {
        margin-bottom: 0;
    }

    .user_profile_container {
        display: flex;
        justify-content: space-between;
    }

    .user_profile {
        margin-bottom: 30px;
        font-size: 1.6rem;
    }

    .user_profile .user_random {
        margin-left: 7px;
        color: #999;
    }

    .content_time {
        color: #666;
        font-size: 1.6rem;
    }

    .post_content_container {
        margin-bottom: 30px;
    }

    .post_content_container .post_title {
        font-size: 1.8rem;
        font-weight: 600;
    }

    .post_content_container .post_content p {
        line-height: 30px;
    }

    .post_content_container .post_content p:has(img) {
        display: none;
        line-height: 0;
    }

    .contents_container {
        display: flex;
        justify-content: space-between;
    }

    .tags .tag {
        display: inline-block;
        margin-right: 7px;
        padding: 7px 13px;
        border: 1px solid ${palette.blue[6]};
        border-radius: 20px;
        color: ${palette.blue[6]};
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
        margin-right: 15px;
    }

    .contents_item span:last-child {
        margin-right: 0;
    }

    .contents_item span img {
        width: 20px;
        height: 20px;
        margin-right: 7px;
    }
`;
