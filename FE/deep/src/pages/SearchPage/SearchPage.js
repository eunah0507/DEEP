import { useLocation, useNavigate } from "react-router-dom";
import {
    SearchPageContainer,
    SearchPageWrapper,
    TagSearchContainer,
    TextSearchContainer,
    UserSearchContainer,
} from "./SearchPage.styles";
import { useEffect, useState } from "react";
import axiosInstance from "../../apis/axiosInstance";
import userNothing from "../../assets/images/deep-profile-nothing.png";
import userProfile from "../../assets/images/deep-profile-blue.png";
import { GrView } from "react-icons/gr";
import likesIcon from "../../assets/images/deep-icon-likes.svg";
import commentsIcon from "../../assets/images/deep-icon-comments.svg";
import { useSelector } from "react-redux";

function SearchPage() {
    const [userSearch, setUserSearch] = useState([]);
    const [textSearch, setTextSearch] = useState([]);
    const [tagSearch, setTagSearch] = useState([]);
    const [isUserSearch, setIsUserSearch] = useState(false);
    const [isTextSearch, setIsTextSearch] = useState(false);
    const [isTagSearch, setIsTagSearch] = useState(false);

    const location = useLocation();

    const navigate = useNavigate();

    const member = useSelector((state) => state.member.value);

    useEffect(() => {
        const tagValue = decodeURIComponent(location.hash);
        const textValue = decodeURIComponent(
            location.search.split("?query=")[1]
        );
        const userValue =
            decodeURIComponent(location.search.split("?query=")[1]) +
            decodeURIComponent(location.hash);

        const tagRegex = /^#./gi;
        const textRegex = /^[^\s]./gi;
        const userRegex =
            /^[^\s][a-zA-Z가-힣0-9?!@$%^&*(){}[\]-_=+;:'"]+#+\d{5}/gi;

        if (userRegex.test(userValue)) {
            const nickName = userValue.split("#")[0];
            const random = userValue.split("#")[1];

            axiosInstance
                .post("/deep/member/search", {
                    memberNickName: nickName,
                    memberRandom: `#${random}`,
                })
                .then((response) => {
                    setUserSearch(response.data);

                    setIsUserSearch(true);
                    setIsTextSearch(false);
                    setIsTagSearch(false);
                })
                .catch((error) => {
                    console.log(error);
                });
        } else if (tagRegex.test(tagValue)) {
            axiosInstance
                .post("/deep/board/search-tag", {
                    tag: tagValue,
                    page: 1,
                })
                .then((response) => {
                    setTagSearch(response.data);

                    setIsUserSearch(false);
                    setIsTextSearch(false);
                    setIsTagSearch(true);
                })
                .catch((error) => {
                    console.log(error);
                });
        } else if (textRegex.test(textValue)) {
            axiosInstance
                .post("/deep/board/search", {
                    keyword: textValue,
                    page: 1,
                })
                .then((response) => {
                    setTextSearch(response.data);

                    setIsTextSearch(true);
                    setIsTagSearch(false);
                })
                .catch((error) => {
                    console.log(error);
                });

            axiosInstance
                .post("/deep/member/search", {
                    memberNickName: textValue,
                    memberRandom: "",
                })
                .then((response) => {
                    setUserSearch(response.data);

                    setIsUserSearch(true);
                    setIsTagSearch(false);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [location]);

    const createdTime = (time) => {
        const date = new Date(time);
        date.setHours(date.getHours() + 9);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");

        const formattedDate = `${year}.${month}.${day} ${hours}:${minutes}`;

        return formattedDate;
    };

    const handleClickProfile = (e, nickName, random) => {
        const userRandom = random.replace("#", "");

        if (
            member.memberNickName === nickName &&
            member.memberRandom === random
        ) {
            navigate(`/profile/${userRandom}`);
        } else {
            navigate(`/profile/${nickName}/${userRandom}`);
        }
    };

    const handleClickPost = (e, category, boardNo) => {
        navigate(`/${category}/${boardNo}`);
    };

    return (
        <SearchPageWrapper>
            <SearchPageContainer>
                {isUserSearch ? (
                    <UserSearchContainer>
                        <h4 className="user_search_title">프로필</h4>
                        <span className="user_search_count">
                            {userSearch.length}
                        </span>
                        <ul className="user_search_result">
                            {userSearch.length === 0 ? (
                                <div className="search_nothing_container">
                                    <div className="search_nothing">
                                        <img
                                            src={userNothing}
                                            alt="user_nothing"
                                        />
                                    </div>
                                    <span>
                                        검색 결과가 존재하지 않는 유저입니다.
                                    </span>
                                </div>
                            ) : (
                                <>
                                    {userSearch.map((user) => {
                                        return (
                                            <li
                                                className="user_profile_container"
                                                onClick={(e) =>
                                                    handleClickProfile(
                                                        e,
                                                        user.memberNickName,
                                                        user.memberRandom
                                                    )
                                                }
                                            >
                                                <div className="user_profile">
                                                    {user.memberFile ===
                                                    null ? (
                                                        <img
                                                            src={userProfile}
                                                            alt="user-profile-image"
                                                        />
                                                    ) : (
                                                        <img
                                                            src={
                                                                user.memberFile
                                                            }
                                                            alt="user-profile-image"
                                                        />
                                                    )}
                                                    <span className="user_name">
                                                        {user.memberNickName}
                                                    </span>
                                                    <span className="user_random">
                                                        {user.memberRandom}
                                                    </span>
                                                </div>
                                                <div className="user_introduce_container">
                                                    <span className="user_introduce">
                                                        {user.memberIntroduce}
                                                    </span>
                                                </div>
                                            </li>
                                        );
                                    })}
                                </>
                            )}
                        </ul>
                    </UserSearchContainer>
                ) : (
                    <></>
                )}
                {isTextSearch ? (
                    <TextSearchContainer>
                        <h4 className="text_search_title">게시글</h4>
                        <span className="text_search_count">
                            {textSearch.length}
                        </span>
                        <ul className="text_search_result">
                            {textSearch.length === 0 ? (
                                <div className="search_nothing_container">
                                    <div className="search_nothing">
                                        <img
                                            src={userNothing}
                                            alt="user_nothing"
                                        />
                                    </div>
                                    <span>검색 결과가 없습니다.</span>
                                </div>
                            ) : (
                                <>
                                    {textSearch.map((post) => {
                                        return (
                                            <li className="post_container">
                                                <div className="user_profile">
                                                    <span className="user_name">
                                                        {post.memberNickName}
                                                    </span>
                                                    <span className="user_random">
                                                        {post.memberRandom}
                                                    </span>
                                                </div>
                                                <div
                                                    className="post_content_container"
                                                    onClick={(e) =>
                                                        handleClickPost(
                                                            e,
                                                            post.category,
                                                            post.boardNo
                                                        )
                                                    }
                                                >
                                                    <h5 className="post_title">
                                                        {post.title}
                                                    </h5>
                                                    <p
                                                        className="post_content"
                                                        dangerouslySetInnerHTML={{
                                                            __html: post.content,
                                                        }}
                                                    ></p>
                                                </div>
                                                <div className="contents_container">
                                                    <ul className="tags">
                                                        {post.tag.map((t) => {
                                                            return (
                                                                <li className="tag">
                                                                    {t}
                                                                </li>
                                                            );
                                                        })}
                                                    </ul>
                                                    <div className="contents_item">
                                                        <span className="views">
                                                            <GrView />
                                                            <span>
                                                                {post.view}
                                                            </span>
                                                        </span>
                                                        <span className="likes">
                                                            <img
                                                                src={likesIcon}
                                                                alt="likes-icon"
                                                            />

                                                            <span>
                                                                {post.like}
                                                            </span>
                                                        </span>
                                                        <span className="comments">
                                                            <img
                                                                src={
                                                                    commentsIcon
                                                                }
                                                                alt="comments-icon"
                                                            />
                                                            <span>
                                                                {post.reply}
                                                            </span>
                                                        </span>
                                                    </div>
                                                </div>
                                            </li>
                                        );
                                    })}
                                </>
                            )}
                        </ul>
                    </TextSearchContainer>
                ) : (
                    <></>
                )}
                {isTagSearch ? (
                    <TagSearchContainer>
                        <h4 className="text_search_title">태그</h4>
                        <span className="text_search_count">
                            {tagSearch.length}
                        </span>
                        <ul className="text_search_result">
                            {tagSearch.length === 0 ? (
                                <div className="search_nothing_container">
                                    <div className="search_nothing">
                                        <img
                                            src={userNothing}
                                            alt="user_nothing"
                                        />
                                    </div>
                                    <span>검색 결과가 없습니다.</span>
                                </div>
                            ) : (
                                <>
                                    {tagSearch.map((post) => {
                                        return (
                                            <li
                                                className="post_container"
                                                onClick={(e) =>
                                                    handleClickPost(
                                                        e,
                                                        post.category,
                                                        post.boardNo
                                                    )
                                                }
                                            >
                                                <div className="user_profile_container">
                                                    <div className="user_profile">
                                                        <span className="user_name">
                                                            {
                                                                post.memberNickName
                                                            }
                                                        </span>
                                                        <span className="user_random">
                                                            {post.memberRandom}
                                                        </span>
                                                    </div>
                                                    <div className="content_time">
                                                        <span>
                                                            {createdTime(
                                                                post.boardCreatedTime
                                                            )}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="post_content_container">
                                                    <h5 className="post_title">
                                                        {post.boardTitle}
                                                    </h5>
                                                    <p
                                                        className="post_content"
                                                        dangerouslySetInnerHTML={{
                                                            __html: post.content,
                                                        }}
                                                    ></p>
                                                </div>
                                                <div className="contents_container">
                                                    <ul className="tags">
                                                        {post.tag.map((t) => {
                                                            return (
                                                                <li className="tag">
                                                                    {t}
                                                                </li>
                                                            );
                                                        })}
                                                    </ul>
                                                    <div className="contents_item">
                                                        <span className="likes">
                                                            <img
                                                                src={likesIcon}
                                                                alt="likes-icon"
                                                            />

                                                            <span>
                                                                {post.like}
                                                            </span>
                                                        </span>
                                                        <span className="comments">
                                                            <img
                                                                src={
                                                                    commentsIcon
                                                                }
                                                                alt="comments-icon"
                                                            />
                                                            <span>
                                                                {post.reply}
                                                            </span>
                                                        </span>
                                                    </div>
                                                </div>
                                            </li>
                                        );
                                    })}
                                </>
                            )}
                        </ul>
                    </TagSearchContainer>
                ) : (
                    <></>
                )}
            </SearchPageContainer>
        </SearchPageWrapper>
    );
}

export default SearchPage;
