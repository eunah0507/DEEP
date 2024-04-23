import { Link } from "react-router-dom";
import styled from "styled-components";
import { palette } from "../../styles/palette";

export const MainSection = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    max-width: 100vw;
    height: 1030px;
    margin-top: 50px;
`;

export const MainBgContainer = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        filter: brightness(50%);
    }
`;

export const MainContentsContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 1280px;
    height: 100%;
    margin: 0 auto;
    color: #fff;

    p {
        font-size: 4.2rem;
        font-weight: 600;
    }

    p:nth-child(1) {
        margin-bottom: 10px;
    }

    p:nth-child(2) {
        margin-bottom: 30px;
    }
`;

export const StartButton = styled(Link)`
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 200px;
    height: 50px;
    line-height: 50px;
    border-radius: 25px;
    background: ${palette.blue[6]};
    color: #fff;
    font-size: 1.8rem;
    font-weight: 700;
    transition: all 0.2s;
    cursor: pointer;

    &:hover {
        background: ${palette.blue[8]};
    }

    img {
        width: 20px;
        margin-left: 20px;
    }
`;
