import styled from "styled-components";
import Button from "../Button/Button";

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

export const LoginBtn = styled(Button)`
    width: 75px;
    height: 44px;
    margin-right: 10px;
`;

export const SignUpBtn = styled(Button)`
    width: 80px;
    height: 44px;
`;
