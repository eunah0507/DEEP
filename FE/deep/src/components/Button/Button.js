import styled, { css } from "styled-components";
import { palette } from "../../styles/palette";
import { Link } from "react-router-dom";

const buttonStyle = css`
    display: inline-flex;
    justify-content: center;
    align-items: center;
    height: 50px;
    line-height: 50px;
    border: none;
    border-radius: 5px;
    background: ${palette.blue[6]};
    color: #fff;
    font-size: 1.6rem;
    font-weight: 700;
    outline: none;
    transition: all 0.2s;
    cursor: pointer;

    &:hover {
        background: ${palette.blue[8]};
    }

    &:disabled {
        background: #ccc;
        cursor: default;
    }

    ${(props) =>
        props.inverted &&
        css`
            border: 1px solid #ddd;
            border-radius: 5px;
            background: #fff;
            color: #000;
            font-weight: 500;
            outline: none;
            cursor: pointer;

            &:hover {
                background: #ddd;
            }
        `};

    ${(props) =>
        props.largeWidth &&
        css`
            width: 610px;
        `}

    ${(props) =>
        props.mediumWidth &&
        css`
            width: 400px;
        `}

    ${(props) =>
        props.smallWidth &&
        css`
            width: 295px;
        `}

    ${(props) =>
        props.xSmallWidth &&
        css`
            width: 85px;
        `}


    ${(props) =>
        props.largeFont &&
        css`
            font-size: 1.8rem;
        `}
`;

const StyledButton = styled.button`
    ${buttonStyle}
`;

const StyledLink = styled(Link)`
    ${buttonStyle}
`;

const Button = (props) => {
    return props.to ? <StyledLink {...props} /> : <StyledButton {...props} />;
};

export default Button;
