import { useEffect, useState } from "react";
import axiosInstance from "../../../apis/axiosInstance";
import { CommentsContainer } from "./UserComments.styles";
import Button from "../../../components/Button/Button";

function UserComment() {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        axiosInstance
            .get("/deep/member/profile-reply")
            .then((response) => {
                console.log(response.data);
                setComments(response.data);
            })
            .catch((error) => console.log(error));
    }, []);

    const commentCreatedDate = comments.map((comment) => {
        return comment.boardCreatedTime.split("T")[0].replaceAll("-", ".");
    });

    const commentCreatedTime = comments.map((comment) => {
        return comment.boardCreatedTime.split("T")[1].split(".")[0].slice(0, 5);
    });

    return (
        <CommentsContainer>
            <ul className="user_comments">
                {comments.map((comment, index) => {
                    return (
                        <li className="user_comment">
                            <div className="user_comment_info">
                                <p className="comment">
                                    {comment.replyContent}
                                </p>
                                <span className="user_post_title">
                                    {comment.boardTitle}
                                </span>
                            </div>
                            <div className="contents_item">
                                <div className="user_comment_time">
                                    <span className="created_date">
                                        {commentCreatedDate[index]}
                                    </span>
                                    <span className="created_time">
                                        {commentCreatedTime[index]}
                                    </span>
                                </div>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </CommentsContainer>
    );
}

export default UserComment;
