import { useMemo, useState } from "react";
import {
    CommentInput,
    CommentsPageContainer,
    CommentsPageWrapper,
} from "./CommentsPage.styles";
import axiosInstance from "../../../apis/axiosInstance";
import Button from "../../../components/Button/Button";
import userInfo from "../../../assets/images/deep-profile-blue.png";
import { useSelector } from "react-redux";
import commentIcon from "../../../assets/images/deep-icon-comments.svg";
import { useNavigate } from "react-router-dom";

function CommentsPage({ boardNo }) {
    const [postComments, setPostComments] = useState([]);
    const [commentValue, setCommentValue] = useState("");
    const [commentModify, setCommentModify] = useState("");
    const [modifyIndex, setModifyIndex] = useState(null);
    const [isCommentMenuOpen, setIsCommentMenuOpen] = useState(false);
    const [isModify, setIsModify] = useState(false);
    const [isIndex, setIsIndex] = useState(null);

    const member = useSelector((state) => state.member.value);

    const navigate = useNavigate();

    useMemo(() => {
        axiosInstance
            .get(`/deep/board/reply-list?boardNo=${boardNo}`)
            .then((response) => {
                setPostComments(response.data.reverse());
            })
            .catch((error) => {
                console.log(error);
            });
    }, [postComments]);

    const commentCreatedTime = postComments.map((comment) => {
        let date;

        if (comment.replyUpdateTim) {
            date = new Date(comment.replyUpdateTim);
        } else {
            date = new Date(comment.replyCreatedTime);
        }

        date.setHours(date.getHours() + 9);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");

        const formattedDate = `${year}.${month}.${day} ${hours}:${minutes}`;

        return formattedDate;
    });

    const handleInputComment = (e) => {
        setCommentValue(e.target.value);
    };

    const createComment = () => {
        const commentInfo = {
            boardNo: boardNo,
            parentNo: 0,
            replyContent: commentValue,
        };

        if (0 < commentValue.length) {
            axiosInstance
                .post("/deep/board/reply-write", commentInfo)
                .then((response) => {
                    setCommentValue("");
                })
                .catch((error) => {
                    console.log(error);
                    alert("댓글 작성에 실패했습니다.");
                });
        } else {
            alert("댓글을 작성해 주세요.");
        }
    };

    const createCommentEnter = (e) => {
        if (e.key === "Enter") {
            createComment();
        }
    };

    const handleClickProfile = (e, nickName, random) => {
        const userRandom = random.replace("#", "");

        if (
            member.memberNickName === nickName &&
            member.memberRandom === random
        ) {
            navigate(`/profile/${userRandom}`);
        } else {
            navigate(`/profile/${nickName}/${userRandom}`);
        }
    };

    const handleClickMenu = (e, index) => {
        setIsCommentMenuOpen(!isCommentMenuOpen);
        setIsIndex(index);
    };

    const handleModifyInput = (e) => {
        setCommentModify(e.target.value);
    };

    const handleModifyComment = (e, index, modifyComment) => {
        setCommentModify(modifyComment);
        setIsModify(true);
        setModifyIndex(index);
    };

    const modifyComment = (e, replyNo) => {
        const modifyInfo = {
            boardNo: boardNo,
            replyNo: replyNo,
            replyContent: commentModify,
        };

        axiosInstance
            .put("/deep/board/reply-modify", modifyInfo)
            .then((response) => {
                setIsModify(false);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleDeleteComment = (e, replyNo) => {
        axiosInstance
            .delete(`/deep/board/reply-delete?replyNo=${replyNo}`)
            .then((response) => {
                alert("댓글이 삭제 되었습니다.");
            })
            .catch((error) => {
                console.log(error);
                alert("댓글 삭제에 실패했습니다.");
            });
    };

    return (
        <CommentsPageWrapper>
            <h4 className="total_comments">{postComments.length}개의 댓글</h4>
            <div className="comment_input">
                <textarea
                    name="message"
                    value={commentValue}
                    placeholder="댓글을 작성해 보세요."
                    rows={1}
                    maxLength="1000"
                    onChange={handleInputComment}
                    onKeyDown={createCommentEnter}
                ></textarea>
                <Button xSmallWidth inverted onClick={createComment}>
                    등록
                </Button>
            </div>
            <CommentsPageContainer>
                <ul className="comments">
                    {postComments.length === 0 ? (
                        <div className="nothing_comment_container">
                            <div className="nothing_comment">
                                <img
                                    className="comment_icon"
                                    src={commentIcon}
                                    alt="nothing comment"
                                />
                            </div>
                            <span>작성된 댓글이 없어요.</span>
                        </div>
                    ) : (
                        postComments.map((comment, index) => {
                            return (
                                <li className="comment">
                                    <div className="comment_top">
                                        <div
                                            className="user_info"
                                            onClick={(e) =>
                                                handleClickProfile(
                                                    e,
                                                    comment.memberNickName,
                                                    comment.memberRandom
                                                )
                                            }
                                        >
                                            {comment.memberFile === null ? (
                                                <img
                                                    className="user_profile_img"
                                                    src={userInfo}
                                                    alt="user-profile-image"
                                                />
                                            ) : (
                                                <img
                                                    className="user_profile_img"
                                                    src={comment.memberFile}
                                                    alt="user-profile-image"
                                                />
                                            )}
                                            <span className="user_name">
                                                {comment.memberNickName}
                                            </span>
                                            <span className="user_random">
                                                {comment.memberRandom}
                                            </span>
                                        </div>
                                        {member.memberNickName ===
                                            comment.memberNickName &&
                                        member.memberRandom ===
                                            comment.memberRandom ? (
                                            <div className="comment_menu_container">
                                                <div
                                                    className="comment_menu"
                                                    onClick={(e) =>
                                                        handleClickMenu(
                                                            e,
                                                            index
                                                        )
                                                    }
                                                    onBlur={() =>
                                                        setIsCommentMenuOpen(
                                                            false
                                                        )
                                                    }
                                                    tabIndex={0}
                                                >
                                                    <span></span>
                                                    <span></span>
                                                    <span></span>
                                                </div>
                                                <ul
                                                    className={
                                                        "menu " +
                                                        (isCommentMenuOpen &&
                                                        isIndex === index
                                                            ? ""
                                                            : "hidden")
                                                    }
                                                >
                                                    <li
                                                        className="modify"
                                                        onMouseDown={(e) =>
                                                            handleModifyComment(
                                                                e,
                                                                index,
                                                                comment.replyContent
                                                            )
                                                        }
                                                    >
                                                        수정하기
                                                    </li>
                                                    <li
                                                        className="delete"
                                                        onMouseDown={(e) =>
                                                            handleDeleteComment(
                                                                e,
                                                                comment.replyNo
                                                            )
                                                        }
                                                    >
                                                        삭제하기
                                                    </li>
                                                </ul>
                                            </div>
                                        ) : (
                                            <></>
                                        )}
                                    </div>
                                    {isModify && index === modifyIndex ? (
                                        <div className="comment_modify_container">
                                            <div className="comment_modify">
                                                <textarea
                                                    name="message"
                                                    value={commentModify}
                                                    rows={1}
                                                    maxLength="1000"
                                                    onChange={handleModifyInput}
                                                ></textarea>
                                            </div>
                                            <Button
                                                xSmallWidth
                                                inverted
                                                onClick={(e) =>
                                                    modifyComment(
                                                        e,
                                                        comment.replyNo
                                                    )
                                                }
                                            >
                                                등록
                                            </Button>
                                        </div>
                                    ) : (
                                        <div className="comment_content">
                                            <p>{comment.replyContent}</p>
                                        </div>
                                    )}
                                    {isModify && index === modifyIndex ? (
                                        <></>
                                    ) : (
                                        <div className="comment_item">
                                            <span className="reply">
                                                댓글 달기
                                            </span>
                                            <span className="created_time">
                                                {commentCreatedTime[index]}
                                            </span>
                                        </div>
                                    )}
                                </li>
                            );
                        })
                    )}
                </ul>
            </CommentsPageContainer>
        </CommentsPageWrapper>
    );
}

export default CommentsPage;
