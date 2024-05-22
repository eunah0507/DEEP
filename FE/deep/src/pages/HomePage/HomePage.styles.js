import styled from "styled-components";
import { palette } from "../../styles/palette";

export const HomeWrapper = styled.div`
    display: flex;
    justify-content: center;

    .qr_code_container {
        position: fixed;
        bottom: 120px;
        right: 30px;
        text-align: center;
        width: 280px;
        height: 450px;
        padding: 50px 30px;
        border-radius: 20px;
        background: #fff;
        box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.15);
        z-index: 99;
    }

    .qr_code_container.hidden {
        display: none;
    }

    .qr_code_container img {
        width: 100%;
        object-fit: contain;
    }

    .qr_code_container .qr_code_introduce {
        display: block;
        margin-top: 20px;
        line-height: 1.7;
        font-size: 1.8rem;
        font-weight: 500;
        word-break: keep-all;
    }

    .qr_code_container .qr_code_introduce span {
        color: ${palette.blue[7]};
        font-weight: 600;
    }

    .qr_code_button {
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 70px;
        height: 70px;
        cursor: pointer;
    }

    .qr_code_button img {
        width: 100%;
        height: 100%;
        border-radius: 28px;
        object-fit: contain;
    }
`;

export const HomeContainer = styled.div`
    width: 1280px;
    max-width: 1280px;
    height: calc(100% - 60px);
    margin: 60px 0 200px;

    /* notice */
    .notice {
        width: 100%;
        margin: 50px 0;
    }

    .notice h3 {
        margin-bottom: 20px;
        font-size: 2.2rem;
        font-weight: 600;
        cursor: pointer;
    }

    .notice .notice_content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        padding: 25px 30px;
        border: 1px solid #ddd;
        border-radius: 5px;
        overflow: hidden;
    }

    .notice .notice_content p {
        font-size: 1.8rem;
        font-weight: 500;
    }

    .notice .notice_content span {
        color: #999;
        font-size: 1.6rem;
    }

    /* boards */
    .boards {
        display: flex;
        justify-content: space-between;
        width: 100%;
        margin-bottom: 50px;
    }

    .boards .board {
        width: 610px;
    }

    .boards .board h4 {
        margin-bottom: 20px;
        font-size: 2.2rem;
        font-weight: 600;
        cursor: pointer;
    }

    .board_container {
        min-height: 735px;
    }

    .boards .board ul li:last-child {
        margin-bottom: 0;
    }
`;
