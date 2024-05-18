import { useEffect, useState } from "react";
import axiosInstance from "../../../apis/axiosInstance";
import { UserPostContainer } from "./UserPost.styles";
import { GrView } from "react-icons/gr";
import likesIcon from "../../../assets/images/deep-icon-likes.svg";
import commentsIcon from "../../../assets/images/deep-icon-comments.svg";

function UserPost() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axiosInstance
            .get("/deep/member/profile-post")
            .then((response) => {
                setPosts(response.data);
            })
            .catch((error) => console.log(error));
    }, []);

    const postCreatedDate = posts.map((post) => {
        return post.boardCreatedTime.split("T")[0].replaceAll("-", ".");
    });

    const postCreatedTime = posts.map((post) => {
        return post.boardCreatedTime.split("T")[1].split(".")[0].slice(0, 5);
    });

    return (
        <UserPostContainer>
            <ul className="user_posts">
                {posts.map((post, index) => {
                    return (
                        <li className="user_post">
                            <div className="post_info">
                                <p className="post_title">{post.boardTitle}</p>
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
                                    <img src={likesIcon} alt="likes-icon" />
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
        </UserPostContainer>
    );
}

export default UserPost;
