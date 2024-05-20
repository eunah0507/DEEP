import { MainPostContainer } from "./MainPost.styles";
import userProfile from "../../../assets/images/deep-profile-blue.png";
import likesIcon from "../../../assets/images/deep-icon-likes.svg";
import commentsIcon from "../../../assets/images/deep-icon-comments.svg";
import { useNavigate } from "react-router-dom";

function MainPost({ post, boardNo, category }) {
    const navigate = useNavigate();

    const handleClickPost = () => {
        navigate(`/${category}/${boardNo}`);
    };

    return (
        <MainPostContainer onClick={handleClickPost}>
            <div className="user_profile">
                {post.memberFile === null ? (
                    <img src={userProfile} alt="user-profile-image" />
                ) : (
                    <img src={post.memberFile} alt="user-profile-image" />
                )}
                <span className="user_name">{post.memberNickName}</span>
            </div>
            <h5 className="post_title">{post.boardTitle}</h5>
            <div className="contents_item">
                <span className="likes">
                    <img src={likesIcon} alt="likes-icon" />
                    <span>{post.like}</span>
                </span>
                <span className="comments">
                    <img src={commentsIcon} alt="comments-icon" />
                    <span>{post.reply}</span>
                </span>
            </div>
        </MainPostContainer>
    );
}

export default MainPost;
