import styled from "styled-components";
import { palette } from "../../styles/palette";

export const NotFoundWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
`;

export const NotFoundContainer = styled.div`
    .deep_icon {
        width: 256px;
        height: 256px;
        margin: 0 auto 30px;
    }

    .deep_icon img {
        width: 100%;
        height: 100%;
    }

    .text_container {
        text-align: center;
    }

    .text_container h3 {
        margin-bottom: 20px;
        color: ${palette.blue[5]};
        font-size: 4rem;
        font-weight: 600;
    }

    .text_container p {
        margin-bottom: 10px;
        color: #666;
        font-size: 2rem;
    }
`;
