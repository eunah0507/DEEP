import styled from "styled-components";

export const SearchWrapper = styled.div`
    position: absolute;
    top: 60px;
    left: 0;
    width: 100vw;
    height: calc(100vh - 60px);
    background: rgba(0, 0, 0, 0.3);
`;

export const SearchContainer = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    height: 70px;
    border-bottom: 1px solid #ddd;
    background: #fff;
`;

export const SearchInputContainer = styled.div`
    display: flex;
    align-items: center;
    position: relative;
    width: 1280px;
    height: 70px;

    img {
        position: absolute;
        top: 50%;
        left: 0;
        transform: translateY(-50%);
        width: 25px;
        height: 25px;
    }
`;

const StyledInput = styled.input`
    width: 100%;
    height: 50px;
    padding-left: 40px;
    padding-right: 20px;
    border: none;
    font-size: 2rem;
    outline: none;
`;

const SearchInput = (props) => {
    return <StyledInput {...props} />;
};

export default SearchInput;
