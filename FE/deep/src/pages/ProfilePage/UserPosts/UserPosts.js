import { useEffect, useState } from "react";
import axiosInstance from "../../../apis/axiosInstance";
import { GrView } from "react-icons/gr";
import likesIcon from "../../../assets/images/deep-icon-likes.svg";
import commentsIcon from "../../../assets/images/deep-icon-comments.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { UserPostsContainer } from "./UserPosts.styles";
import postsIcon from "../../../assets/images/deep-icon-posts.svg";

function UserPosts() {
    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState([]);

    const navigate = useNavigate();

    const location = useLocation();

    const userNickName = decodeURIComponent(location.pathname.split("/")[2]);
    const userRandom = location.pathname.split("/")[3];

    useEffect(() => {
        axiosInstance
            .post("/deep/member/others-post", {
                memberNickName: userNickName,
                memberRandom: `#${userRandom}`,
            })
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
        // const date = new Date(post.boardCreatedTime);
        // date.setHours(date.getHours() + 9);
        // const year = date.getFullYear();
        // const month = String(date.getMonth() + 1).padStart(2, "0");
        // const day = String(date.getDate()).padStart(2, "0");
        // const hours = String(date.getHours()).padStart(2, "0");
        // const minutes = String(date.getMinutes()).padStart(2, "0");

        // const formattedDate = `${year}.${month}.${day} ${hours}:${minutes}`;

        // return formattedDate;
        return post.boardCreatedTime;
    });

    return (
        <>
            {loading ? (
                <></>
            ) : (
                <UserPostsContainer>
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
                                                <span className="created_time">
                                                    {postCreatedDate[index]}
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
                </UserPostsContainer>
            )}
        </>
    );
}

export default UserPosts;
