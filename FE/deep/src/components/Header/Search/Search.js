import SearchInput, {
    SearchContainer,
    SearchInputContainer,
    SearchWrapper,
} from "./Search.styles";
import searchIcon from "../../../assets/images/deep-icon-search.svg";
import { useState } from "react";
import { useSelector } from "react-redux";
import axiosInstance from "../../../apis/axiosInstance";

function Search(props) {
    const [searchValue, setSearchValue] = useState("");

    const member = useSelector((state) => state.member.value);

    const handleSearchInfo = (e) => {
        setSearchValue(e.target.value);
    };

    const searchInfo = () => {
        axiosInstance.post("/deep/member/search", {
            memberNickName: member.memberNickName,
            memberRandom: member.memberRandom,
        });
    };

    const handleSearchEnter = (e) => {
        if (e.key === "Enter") {
            searchInfo();
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
