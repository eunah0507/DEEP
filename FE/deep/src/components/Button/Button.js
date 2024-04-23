import styled, { css } from "styled-components";
import { palette } from "../../styles/palette";
import { Link } from "react-router-dom";

const buttonStyle = css`
    display: inline-flex;
    justify-content: center;
    align-items: center;
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

    ${(props) =>
        props.inverted &&
        css`
            border: 1px solid #ddd;
            border-radius: 5px;
            background: #fff;
            color: #000;
            outline: none;
            cursor: pointer;

            &:hover {
                background: #ddd;
            }
        `};
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
