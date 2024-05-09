import styled from "styled-components";

export const FindIdContainer = styled.div`
    width: 610px;

    /* title */
    .title {
        margin-bottom: 30px;
        text-align: center;
        font-size: 2rem;
    }

    /* find id */
    .find_id {
        display: flex;
        align-items: center;
        width: 100%;
        padding: 50px 85px;
        border: 1px solid #ddd;
        border-radius: 5px;
    }

    .find_id ul {
        width: 100%;
    }

    .find_id ul .user_id {
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;
        font-size: 1.6rem;
    }

    .find_id ul .user_id:last-child {
        margin-bottom: 0;
    }

    .find_id ul .user_id p {
        display: inline-flex;
    }

    .find_id ul .user_id p span {
        margin-right: 20px;
        font-weight: 700;
    }

    /* buttons */
    .buttons {
        margin-top: 50px;
    }

    .buttons > a:first-child {
        margin-right: 20px;
    }
`;
