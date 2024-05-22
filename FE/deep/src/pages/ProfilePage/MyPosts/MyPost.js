import { useEffect, useState } from "react";
import axiosInstance from "../../../apis/axiosInstance";
import { MyPostContainer } from "./MyPost.styles";
import { GrView } from "react-icons/gr";
import likesIcon from "../../../assets/images/deep-icon-likes.svg";
import commentsIcon from "../../../assets/images/deep-icon-comments.svg";
import { useNavigate } from "react-router-dom";
import postsIcon from "../../../assets/images/deep-icon-posts.svg";

function MyPost() {
    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        axiosInstance
            .get("/deep/member/profile-post")
            .then((response) => {
                setPosts(response.data);
                setLoading(false);
            })
            .catch((error) => console.log(error));
    }, []);

    const handleClickPost = (e, category, boardNo) => {
        navigate(`/${category}/${boardNo}`);
    };

    const postCreatedDate = posts.map((post) => {
        return post.boardCreatedTime.split("T")[0].replaceAll("-", ".");
    });

    const postCreatedTime = posts.map((post) => {
        return post.boardCreatedTime.split("T")[1].split(".")[0].slice(0, 5);
    });

    return (
        <>
            {loading ? (
                <></>
            ) : (
                <MyPostContainer>
                    {posts.length === 0 ? (
                        <div className="nothing_posts_container">
                            <div className="nothing_posts">
                                <img src={postsIcon} alt="posts icon" />
                            </div>
                            <span>작성한 글이 없습니다.</span>
                        </div>
                    ) : (
                        <ul className="user_posts">
                            {posts.map((post, index) => {
                                return (
                                    <li
                                        className="user_post"
                                        onClick={(e) =>
                                            handleClickPost(
                                                e,
                                                post.category,
                                                post.boardNo
                                            )
                                        }
                                    >
                                        <div className="post_info">
                                            <p className="post_title">
                                                {post.boardTitle}
                                            </p>
                                            <div className="user_post_time">
                                                <span className="created_date">
                                                    {postCreatedDate[index]}
                                                </span>
                                                <span className="created_time">
                                                    {postCreatedTime[index]}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="contents_item">
                                            <span className="views">
                                                <GrView />
                                                <span>{post.view}</span>
                                            </span>
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
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                </MyPostContainer>
            )}
        </>
    );
}

export default MyPost;
