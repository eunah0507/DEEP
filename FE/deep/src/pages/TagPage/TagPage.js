import { useEffect, useState } from "react";
import { TagPageContainer, TagPageWrapper } from "./TagPage.styles";
import axiosInstance from "../../apis/axiosInstance";
import { useLocation, useNavigate } from "react-router-dom";
import likesIcon from "../../assets/images/deep-icon-likes.svg";
import commentsIcon from "../../assets/images/deep-icon-comments.svg";
import searchNothing from "../../assets/images/deep-profile-nothing.png";

function TagPage() {
    const [tags, setTags] = useState([]);

    const navigate = useNavigate();

    const location = useLocation();

    const searchTag = decodeURIComponent(location.pathname.split("/")[2]);

    useEffect(() => {
        const tagInfo = {
            tag: `#${searchTag}`,
            page: 1,
        };

        axiosInstance
            .post("/deep/board/search-tag", tagInfo)
            .then((response) => {
                setTags(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

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
        navigate(`/profile/${nickName}/${random.replace("#", "")}`);
    };

    const handleClickPost = (e, category, boardNo) => {
        navigate(`/${category}/${boardNo}`);
    };

    return (
        <>
            {tags.length === 0 ? (
                <TagPageWrapper>
                    <TagPageContainer>
                        <div className="nothing_tag_container">
                            <div className="nothing_tag">
                                <img
                                    className="search_nothing"
                                    src={searchNothing}
                                    alt="nothing tag image"
                                />
                            </div>
                            <span>검색 결과가 없습니다.</span>
                        </div>
                    </TagPageContainer>
                </TagPageWrapper>
            ) : (
                <TagPageWrapper>
                    <TagPageContainer>
                        <div className="tag_title">
                            <h4>{`#${searchTag}`}</h4>
                        </div>
                        <ul className="posts_container">
                            {tags.map((tag) => {
                                return (
                                    <li className="post">
                                        <div className="user_profile">
                                            <span
                                                className="user_name"
                                                onClick={(e) =>
                                                    handleClickProfile(
                                                        e,
                                                        tag.memberNickName,
                                                        tag.memberRandom
                                                    )
                                                }
                                            >
                                                {tag.memberNickName}
                                            </span>
                                            <div className="content_time">
                                                <span>
                                                    {createdTime(
                                                        tag.boardCreatedTime
                                                    )}
                                                </span>
                                            </div>
                                        </div>
                                        <div
                                            className="post_content"
                                            onClick={(e) =>
                                                handleClickPost(
                                                    e,
                                                    tag.category,
                                                    tag.boardNo
                                                )
                                            }
                                        >
                                            <h4 className="post_title">
                                                {tag.boardTitle}
                                            </h4>
                                            <div className="contents_container">
                                                <ul className="tags">
                                                    {tag.tag.map((t) => {
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
                                                        <span>{tag.like}</span>
                                                    </span>
                                                    <span className="comments">
                                                        <img
                                                            src={commentsIcon}
                                                            alt="comments-icon"
                                                        />
                                                        <span>{tag.reply}</span>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    </TagPageContainer>
                </TagPageWrapper>
            )}
        </>
    );
}

export default TagPage;
