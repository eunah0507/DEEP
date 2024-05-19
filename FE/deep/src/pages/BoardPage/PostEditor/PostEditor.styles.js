import styled from "styled-components";
import Button from "../../../components/Button/Button";
import { palette } from "../../../styles/palette";

export const PostEditorWrapper = styled.div`
    display: flex;
    justify-content: center;
    height: 100%;
    margin: 0 auto 200px;
    /* border: 1px solid #ddd; */
`;

export const PostEditorContainer = styled.div`
    width: 820px;
    height: calc(100% - 60px);
    margin-top: 60px;

    .post_category_title {
        margin-top: 50px;
        margin-bottom: 20px;
        font-size: 2rem;
    }

    .post_category {
        position: relative;
        width: 100%;
    }

    .post_category button {
        padding: 0 25px;
        border: none;
        border-radius: 5px;
        background: #fff;
        text-align: left;
        font-size: 1.6rem;
        outline: none;
        cursor: pointer;
    }

    .post_category button:hover {
        background: #ddd;
    }

    .post_category .category_default_value {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 50px;
        border: 1px solid #ddd;
        color: #666;
    }

    .post_category .category_default_value svg {
        float: right;
    }

    .post_category .select_category {
        position: absolute;
        top: 55px;
        left: 0;
        display: block;
        width: 100%;
        padding: 10px;
        border-radius: 5px;
        background: #fff;
        box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
        z-index: 1;
    }

    .post_category .select_category.hidden {
        display: none;
    }

    .post_category .select_category li {
    }

    .post_category .select_category li button {
        width: 100%;
        height: 50px;
    }

    .post_category input {
        margin: 30px 0;
    }

    .tags_container {
        margin-top: 50px;
    }

    .tags_container .tag {
        display: inline-block;
        margin-right: 7px;
        margin-bottom: 10px;
        padding: 7px 13px;
        border: 1px solid ${palette.blue[4]};
        border-radius: 20px;
        color: ${palette.blue[7]};
        font-size: 1.4rem;
        cursor: pointer;
    }

    .tags {
        margin-top: 10px;
    }
`;

export const CreatePostBtn = styled(Button)`
    width: 100%;
    margin-top: 50px;
`;
