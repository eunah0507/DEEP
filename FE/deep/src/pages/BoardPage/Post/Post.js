import likesIcon from "../../../assets/images/deep-icon-likes.svg";
import commentsIcon from "../../../assets/images/deep-icon-comments.svg";
import userProfile from "../../../assets/images/deep-profile-blue.png";
import { GrView } from "react-icons/gr";
import { PostListContainer } from "./Post.styles";

function Post({ post }) {
    return (
        <PostListContainer className="post">
            <div className="post_container">
                <div className="user_profile">
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
                </div>
                <div className="content_time">
                    <span>
                        {post.boardCreatedTime
                            .split("T")[0]
                            .replaceAll("-", ".")}
                    </span>
                </div>
            </div>
            <h4 className="post_title">{post.boardTitle}</h4>
            <p className="post_content">{post.boardContent}</p>
            <div className="contents_container">
                <ul className="tags">
                    {post.tag.map((t) => {
                        return <li className="tag">{t}</li>;
                    })}
                </ul>
                <div className="contents_item">
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
        </PostListContainer>
    );
}

export default Post;
