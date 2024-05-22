import { MainPostContainer } from "./MainPost.styles";
import userProfile from "../../../assets/images/deep-profile-blue.png";
import likesIcon from "../../../assets/images/deep-icon-likes.svg";
import commentsIcon from "../../../assets/images/deep-icon-comments.svg";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function MainPost({ post, boardNo, category }) {
    const member = useSelector((state) => state.member.value);

    const navigate = useNavigate();

    const handleClickPost = () => {
        navigate(`/${category}/${boardNo}`);
    };

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

    const createdTime = (time) => {
        const date = new Date(time);
        date.setHours(date.getHours() + 9);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");

        const formattedDate = `${year}.${month}.${day}`;

        return formattedDate;
    };

    return (
        <MainPostContainer>
            <div className="post_container">
                <div className="user_profile" onClick={handleClickProfile}>
                    {post.memberFile === null ? (
                        <img src={userProfile} alt="user-profile-image" />
                    ) : (
                        <img src={post.memberFile} alt="user-profile-image" />
                    )}
                    <span className="user_name">{post.memberNickName}</span>
                    <span className="user_random">{post.memberRandom}</span>
                </div>
                <div className="content_time" onClick={handleClickPost}>
                    <span>{createdTime(post.boardCreatedTime)}</span>
                </div>
            </div>
            <div onClick={handleClickPost}>
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
            </div>
        </MainPostContainer>
    );
}

export default MainPost;
