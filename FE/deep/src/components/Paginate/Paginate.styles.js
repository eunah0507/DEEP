import styled from "styled-components";
import { palette } from "../../styles/palette";

export const PaginateContainer = styled.div`
    .pagination {
        display: flex;
        justify-content: center;
        gap: 10px;
        width: 100%;
        margin-top: 30px;
        font-size: 1.6rem;
    }

    .pagination > * {
        cursor: pointer;
    }

    .pagination_link {
        padding: 5px;
        transition: all 0.2s;
    }

    .pagination_link_active {
        color: ${palette.blue[6]};
    }
`;
