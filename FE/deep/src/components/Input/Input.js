import styled from "styled-components";
import { palette } from "../../styles/palette";

const StyledInput = styled.input`
    width: 100%;
    height: 50px;
    padding: 0 20px;
    border: 1px solid #ddd;
    border-radius: 5px;
    color: #333;
    font-size: 1.6rem;
    outline: none;

    &:focus {
        outline: 2px solid ${palette.blue[6]};
    }
`;

const Input = (props) => {
    return <StyledInput {...props} />;
};

export default Input;
