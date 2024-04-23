import styled from "styled-components";

export const HeaderContainer = styled.div`
    display: flex;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    max-width: 100vw;
    height: 60px;
    border-bottom: 1px solid #ddd;
    background: #fff;
    z-index: 999;

    .wrap {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 1280px;
        margin: 0 auto;
    }

    img {
        width: 100px;
    }
`;
