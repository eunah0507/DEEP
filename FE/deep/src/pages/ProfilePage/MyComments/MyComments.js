import { useEffect, useState } from "react";
import axiosInstance from "../../../apis/axiosInstance";
import { MyCommentsContainer } from "./MyComments.styles";
import { useNavigate } from "react-router-dom";
import commentsIcon from "../../../assets/images/deep-icon-comments.svg";

function MyComments() {
    const [loading, setLoading] = useState(true);
    const [comments, setComments] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        axiosInstance
            .get("/deep/member/profile-reply")
            .then((response) => {
                setComments(response.data);
                setLoading(false);
            })
            .catch((error) => console.log(error));
    }, []);

    const commentCreatedDate = comments.map((comment) => {
        return comment.boardCreatedTime.split("T")[0].replaceAll("-", ".");
    });

    const commentCreatedTime = comments.map((comment) => {
        return comment.boardCreatedTime.split("T")[1].split(".")[0].slice(0, 5);
    });

    const handleClickComment = (e, category, boardNo) => {
        navigate(`/${category}/${boardNo}`);
    };

    return (
        <>
            {loading ? (
                <></>
            ) : (
                <MyCommentsContainer>
                    {comments.length === 0 ? (
                        <div className="nothing_comments_container">
                            <div className="nothing_comments">
                                <img src={commentsIcon} alt="comments icon" />
                            </div>
                            <span>작성한 댓글이 없습니다.</span>
                        </div>
                    ) : (
                        <ul className="user_comments">
                            {comments.map((comment, index) => {
                                return (
                                    <li
                                        className="user_comment"
                                        onClick={(e) =>
                                            handleClickComment(
                                                e,
                                                comment.category,
                                                comment.boardNo
                                            )
                                        }
                                    >
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
                    )}
                </MyCommentsContainer>
            )}
        </>
    );
}

export default MyComments;
