import SearchInput, {
    SearchContainer,
    SearchInputContainer,
    SearchWrapper,
} from "./Search.styles";
import searchIcon from "../../../assets/images/deep-icon-search.svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Search(props) {
    const [searchValue, setSearchValue] = useState("");

    const navigate = useNavigate();

    const handleSearchInfo = (e) => {
        setSearchValue(e.target.value);
    };

    const handleSearchEnter = (e) => {
        if (e.key === "Enter") {
            navigate(`/search?query=${searchValue}`);
            props.setIsSearchOpen(false);
        }
    };

    const handleOnBlur = () => {
        props.setIsSearchOpen(false);
    };

    return (
        <SearchWrapper>
            <SearchContainer>
                <SearchInputContainer>
                    <label htmlFor="search">
                        <img src={searchIcon} alt="search-icon" />
                    </label>
                    <SearchInput
                        type="text"
                        id="search"
                        label="검색"
                        value={searchValue}
                        placeholder="사람, 게시글, 해쉬태그 검색"
                        onChange={handleSearchInfo}
                        onKeyPress={handleSearchEnter}
                        onBlur={handleOnBlur}
                        autoFocus
                    />
                </SearchInputContainer>
            </SearchContainer>
        </SearchWrapper>
    );
}

export default Search;
