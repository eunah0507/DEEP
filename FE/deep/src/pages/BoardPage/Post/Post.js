import likesIcon from "../../../assets/images/deep-icon-likes.svg";
import commentsIcon from "../../../assets/images/deep-icon-comments.svg";
import userProfile from "../../../assets/images/deep-profile-blue.png";
import { GrView } from "react-icons/gr";
import { PostListContainer } from "./Post.styles";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Post({ post }) {
    const member = useSelector((state) => state.member.value);

    const navigate = useNavigate();

    const location = useLocation();

    const date = new Date(post.boardCreatedTime);
    date.setHours(date.getHours() + 9);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    const formattedDate = `${year}.${month}.${day}`;

    const handleClickProfile = () => {
        const userRandom = post.memberRandom.replace("#", "");

        if (
            member.memberNickName === post.memberNickName &&
            member.memberRandom === post.memberRandom
        ) {
            navigate(`/profile/${userRandom}`);
        } else {
            navigate(`/profile/${post.memberNickName}/${userRandom}`);
        }
    };

    const handleClickPost = () => {
        navigate(`${location.pathname}/${post.boardNo}`);
    };

    const handleClickTag = (e, tag) => {
        navigate(`/tag/${tag.replace("#", "")}`);
    };

    return (
        <PostListContainer className="post">
            <div className="post_container">
                <div className="user_profile" onClick={handleClickProfile}>
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
                    <span className="user_name">{post.memberNickName}</span>
                    <span className="user_random">{post.memberRandom}</span>
                </div>
                <div className="content_time" onClick={handleClickPost}>
                    <span>{formattedDate}</span>
                </div>
            </div>
            <div>
                <div onClick={handleClickPost}>
                    <h4 className="post_title">{post.boardTitle}</h4>
                    <div className="post_content_container">
                        <p
                            className="post_content"
                            dangerouslySetInnerHTML={{
                                __html: post.boardContent,
                            }}
                        ></p>
                    </div>
                </div>
                <div className="contents_container">
                    <ul className="tags">
                        {post.tag.map((t) => {
                            return (
                                <li
                                    className="tag"
                                    onClick={(e) => handleClickTag(e, t)}
                                >
                                    {t}
                                </li>
                            );
                        })}
                    </ul>
                    <div className="contents_item" onClick={handleClickPost}>
                        <span className="views">
                            <GrView />
                            <span>{post.view}</span>
                        </span>
                        <span className="likes">
                            <img src={likesIcon} alt="likes-icon" />
                            <span>{post.like}</span>
                        </span>
                        <span className="comments">
                            <img src={commentsIcon} alt="comments-icon" />
                            <span>{post.reply}</span>
                        </span>
                    </div>
                </div>
            </div>
        </PostListContainer>
    );
}

export default Post;
