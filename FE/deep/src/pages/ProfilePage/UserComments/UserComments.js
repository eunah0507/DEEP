import { useEffect, useState } from "react";
import axiosInstance from "../../../apis/axiosInstance";
import { useLocation, useNavigate } from "react-router-dom";
import { UserCommentsContainer } from "./UserComments.styles";
import commentsIcon from "../../../assets/images/deep-icon-comments.svg";

function UserComments() {
    const [loading, setLoading] = useState(true);
    const [comments, setComments] = useState([]);

    const navigate = useNavigate();

    const location = useLocation();

    const userNickName = decodeURIComponent(location.pathname.split("/")[2]);
    const userRandom = location.pathname.split("/")[3];

    useEffect(() => {
        axiosInstance
            .post("/deep/member/others-reply", {
                memberNickName: userNickName,
                memberRandom: `#${userRandom}`,
            })
            .then((response) => {
                setComments(response.data);
                setLoading(false);
            })
            .catch((error) => console.log(error));
    }, []);

    const commentCreatedDate = comments.map((comment) => {
        return comment.boardCreatedTime;
    });

    const handleClickComment = (e, category, boardNo) => {
        navigate(`/${category}/${boardNo}`);
    };

    return (
        <>
            {loading ? (
                <></>
            ) : (
                <UserCommentsContainer>
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
                                                <span className="created_time">
                                                    {commentCreatedDate[index]}
                                                </span>
                                            </div>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                </UserCommentsContainer>
            )}
        </>
    );
}

export default UserComments;
