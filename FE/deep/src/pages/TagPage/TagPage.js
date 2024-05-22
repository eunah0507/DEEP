import { useEffect, useState } from "react";
import { TagPageContainer, TagPageWrapper } from "./TagPage.styles";
import axiosInstance from "../../apis/axiosInstance";
import { useLocation, useNavigate } from "react-router-dom";
import likesIcon from "../../assets/images/deep-icon-likes.svg";
import commentsIcon from "../../assets/images/deep-icon-comments.svg";
import { useSelector } from "react-redux";

function TagPage() {
    const [loading, setLoading] = useState(true);
    const [tags, setTags] = useState([]);

    const navigate = useNavigate();

    const location = useLocation();

    const member = useSelector((state) => state.member.value);

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
                setLoading(false);
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
        <>
            {loading ? (
                <></>
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
                                        <div className="user_profile_container">
                                            <div
                                                className="user_profile"
                                                onClick={(e) =>
                                                    handleClickProfile(
                                                        e,
                                                        tag.memberNickName,
                                                        tag.memberRandom
                                                    )
                                                }
                                            >
                                                <span className="user_name">
                                                    {tag.memberNickName}
                                                </span>
                                                <span className="user_random">
                                                    {tag.memberRandom}
                                                </span>
                                            </div>
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
