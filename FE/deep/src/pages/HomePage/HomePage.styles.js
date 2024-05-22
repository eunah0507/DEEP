import styled from "styled-components";

export const HomeWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
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

    .boards .board ul li:last-child {
        margin-bottom: 0;
    }
`;
