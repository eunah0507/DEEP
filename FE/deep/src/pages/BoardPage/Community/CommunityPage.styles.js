import styled from "styled-components";
import { palette } from "../../../styles/palette";

export const CommunityWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: auto 0;
`;

export const CommunityContainer = styled.div`
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
