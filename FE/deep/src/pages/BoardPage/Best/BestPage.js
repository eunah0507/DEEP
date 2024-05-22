import likesIcon from "../../../assets/images/deep-icon-likes.svg";
import commentsIcon from "../../../assets/images/deep-icon-comments.svg";
import userProfile from "../../../assets/images/deep-profile-blue.png";
import { BestContainer, BestWrapper } from "./BestPage.styles";
import { useEffect, useState } from "react";
import axiosInstance from "../../../apis/axiosInstance";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";

function BestPage() {
    const [posts, setPosts] = useState([]);
    const [pages, setPages] = useState(1);
    const [maxPages, setMaxPages] = useState(1);

    const navigate = useNavigate();

    const member = useSelector((state) => state.member.value);

    const paginate = Array.from({ length: maxPages }, (_, p) => p + 1);

    useEffect(() => {
        axiosInstance
            .get(`/deep/board/best?page=${pages}`)
            .then((response) => {
                setPosts(response.data);
                navigate(`/best?page=${pages}`);
            })
            .catch((error) => {
                console.log(error);
            });

        axiosInstance
            .post("/deep/board/post-page", {
                category: "best",
            })
            .then((response) => {
                setMaxPages(response.data.maxPage);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [pages]);

    const postCreatedTime = posts.map((post) => {
        const date = new Date(post.boardCreatedTime);
        date.setHours(date.getHours() + 9);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");

        const formattedDate = `${year}.${month}.${day}`;

        return formattedDate;
    });

    const handleClickProfile = (e, nickname, random) => {
        const userRandom = random.replace("#", "");

        if (
            member.memberNickName === nickname &&
            member.memberRandom === random
        ) {
            navigate(`/profile/${userRandom}`);
        } else {
            navigate(`/profile/${nickname}/${userRandom}`);
        }
    };

    const handleClickPost = (e, index) => {
        navigate(`/${posts[index].category}/${posts[index].boardNo}`);
    };

    const handleClickPrev = async () => {
        if (pages > 1) {
            setPages(pages - 1);
        } else {
            setPages(pages);
        }
    };

    const handleClickPage = (e, index) => {
        setPages(index + 1);
    };

    const handleClickNext = async () => {
        if (pages < maxPages) {
            setPages(pages + 1);
        } else {
            setPages(pages);
        }
    };

    return (
        <BestWrapper>
            <BestContainer>
                <div className="board_header">
                    <h3 className="board_title">인기글</h3>
                </div>
                <ul className="posts">
                    {posts.map((post, index) => {
                        return (
                            <li className="post">
                                <div
                                    className="user_profile"
                                    onClick={(e) =>
                                        handleClickProfile(
                                            e,
                                            post.memberNickName,
                                            post.memberRandom
                                        )
                                    }
                                >
                                    {post.memberFile === null ? (
                                        <img
                                            className="user_profile_img"
                                            src={userProfile}
                                            alt="user-profile-image"
                                        />
                                    ) : (
                                        <img
                                            className="user_profile_img"
                                            src={post.memberFile}
                                            alt="user-profile-image"
                                        />
                                    )}
                                    <span className="user_name">
                                        {post.memberNickName}
                                    </span>
                                    <span className="user_random">
                                        {post.memberRandom}
                                    </span>
                                </div>
                                <div onClick={(e) => handleClickPost(e, index)}>
                                    <h4 className="post_title">
                                        {post.boardTitle}
                                    </h4>
                                    <div className="post_content_container">
                                        <p
                                            className="post_content"
                                            dangerouslySetInnerHTML={{
                                                __html: post.boardContent,
                                            }}
                                        ></p>
                                    </div>
                                    <div className="contents_container">
                                        <div className="content_time">
                                            <span>
                                                {postCreatedTime[index]}
                                            </span>
                                        </div>
                                        <div className="contents_item">
                                            <span className="likes">
                                                <img
                                                    src={likesIcon}
                                                    alt="likes-icon"
                                                />
                                                <span>{post.like}</span>
                                            </span>
                                            <span className="comments">
                                                <img
                                                    src={commentsIcon}
                                                    alt="comments-icon"
                                                />
                                                <span>{post.reply}</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        );
                    })}
                </ul>
                <ul className="paginate">
                    <li className="prev" onClick={handleClickPrev}>
                        <GoChevronLeft />
                    </li>
                    {paginate.map((page, index) => {
                        return (
                            <li
                                className="page"
                                onClick={(e) => handleClickPage(e, index)}
                            >
                                {page}
                            </li>
                        );
                    })}
                    <li className="next" onClick={handleClickNext}>
                        <GoChevronRight />
                    </li>
                </ul>
            </BestContainer>
        </BestWrapper>
    );
}

export default BestPage;
