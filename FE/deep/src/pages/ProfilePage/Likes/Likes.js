import { useEffect, useState } from "react";
import axiosInstance from "../../../apis/axiosInstance";
import { LikesContainer } from "./Likes.styles";
import { GrView } from "react-icons/gr";
import likesIcon from "../../../assets/images/deep-icon-likes.svg";
import commentsIcon from "../../../assets/images/deep-icon-comments.svg";

function Likes() {
    const [likes, setLikes] = useState([]);

    useEffect(() => {
        axiosInstance
            .get("/deep/member/profile-like")
            .then((response) => {
                setLikes(response.data);
            })
            .catch((error) => console.log(error));
    }, []);

    const postCreatedDate = likes.map((like) => {
        return like.boardCreatedTime.split("T")[0].replaceAll("-", ".");
    });

    const postCreatedTime = likes.map((like) => {
        return like.boardCreatedTime.split("T")[1].split(".")[0].slice(0, 5);
    });

    return (
        <LikesContainer>
            <ul className="post_likes">
                {likes.map((like, index) => {
                    return (
                        <li className="post_like">
                            <div className="post_info">
                                <p className="post_title">{like.boardTitle}</p>
                                <div className="user_post_info">
                                    <span className="user_nickname">
                                        {like.memberNickName}
                                    </span>
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
                                    <span>{like.view}</span>
                                </span>
                                <span className="likes">
                                    <img src={likesIcon} alt="likes-icon" />
                                    <span>{like.like}</span>
                                </span>
                                <span className="comments">
                                    <img
                                        src={commentsIcon}
                                        alt="comments-icon"
                                    />
                                    <span>{like.reply}</span>
                                </span>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </LikesContainer>
    );
}

export default Likes;
