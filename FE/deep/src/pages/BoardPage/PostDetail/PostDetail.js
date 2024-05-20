import { useEffect, useState } from "react";
import axiosInstance from "../../../apis/axiosInstance";
import {
    CommentsContainer,
    PostDetailContainer,
    PostDetailWrapper,
} from "./PostDetail.styles";
import userProfile from "../../../assets/images/deep-profile-blue.png";
import { GrView } from "react-icons/gr";
import likesIcon from "../../../assets/images/deep-icon-likes.svg";
import commentsIcon from "../../../assets/images/deep-icon-comments.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import CommentsPage from "../Comments/CommentsPage";

function PostDetail() {
    const [userProfileImg, setUserProfileImg] = useState("");
    const [userNickName, setUserNickName] = useState("");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [tags, setTags] = useState([]);
    const [boardCreatedTime, setBoardCreatedTime] = useState("");
    const [views, setViews] = useState(0);
    const [likes, setLikes] = useState(0);
    const [comments, setComments] = useState(0);
    const [isPostMenuOpen, setIsPostMenuOpen] = useState(false);
    const [isMyPost, setIsMyPost] = useState(false);

    const navigate = useNavigate();

    const location = useLocation();

    const member = useSelector((state) => state.member.value);

    const boardNo = location.pathname.split("/")[2];

    useEffect(() => {
        axiosInstance
            .post("/deep/board/detail", {
                boardNo: boardNo,
            })
            .then((response) => {
                const data = response.data;

                setUserProfileImg(data.memberFile);
                setUserNickName(data.memberNickName);
                setTitle(data.title);
                setContent(data.content);
                setTags(data.tag);
                setBoardCreatedTime(data.boardCreatedTime);
                setViews(data.view);
                setLikes(data.like);
                setComments(data.reply);

                if (
                    member.memberNickName === data.memberNickName &&
                    member.memberRandom === data.memberRandom
                ) {
                    setIsMyPost(true);
                }
            })
            .catch((error) => {
                console.log(error);
                alert("게시물이 존재하지 않습니다.");
                navigate("/home");
            });
    }, [boardNo]);

    const date = new Date(boardCreatedTime);
    date.setHours(date.getHours() + 9);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    const formattedDate = `${year}.${month}.${day} ${hours}:${minutes}`;

    const handleClickMenu = () => {
        setIsPostMenuOpen(!isPostMenuOpen);
    };

    const handleModifyPost = () => {};

    const handleDeletePost = () => {
        alert("게시글을 삭제하시겠습니까?");
        axiosInstance
            .delete(`/deep/board/delete?boardNo=${boardNo}`)
            .then((response) => {
                alert("게시글이 삭제되었습니다.");
                navigate(-1);
            })
            .catch((error) => {
                console.log(error);
                alert("게시글 삭제에 실패했습니다.");
            });
    };

    return (
        <>
            <PostDetailWrapper>
                <PostDetailContainer>
                    <div className="post_header">
                        <div className="user_profile">
                            {userProfile === null ? (
                                <img
                                    className="user_profile_img"
                                    src={userProfile}
                                    alt="user-profile-image"
                                />
                            ) : (
                                <img
                                    className="user_profile_img"
                                    src={userProfileImg}
                                    alt="user-profile-image"
                                />
                            )}
                            <span className="user_name">{userNickName}</span>
                        </div>
                        {isMyPost ? (
                            <div className="post_menu_container">
                                <div
                                    className="post_menu"
                                    onClick={handleClickMenu}
                                    onBlur={() => setIsPostMenuOpen(false)}
                                    tabIndex={0}
                                >
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                                <ul
                                    className={
                                        "menu " +
                                        (isPostMenuOpen ? "" : "hidden")
                                    }
                                >
                                    <li
                                        className="modify"
                                        onMouseDown={handleModifyPost}
                                    >
                                        수정하기
                                    </li>
                                    <li
                                        className="delete"
                                        onMouseDown={handleDeletePost}
                                    >
                                        삭제하기
                                    </li>
                                </ul>
                            </div>
                        ) : (
                            <></>
                        )}
                    </div>
                    <div className="post_content_container">
                        <h4 className="post_title">{title}</h4>
                        <p
                            className="post_content"
                            dangerouslySetInnerHTML={{ __html: content }}
                        ></p>
                    </div>
                    <ul className="tags">
                        {tags.map((tag) => {
                            return <li className="tag">{tag}</li>;
                        })}
                    </ul>
                    <div className="contents_item_container">
                        <div className="created_time">
                            {boardCreatedTime === "" ? (
                                <span></span>
                            ) : (
                                <span>{formattedDate}</span>
                            )}
                        </div>
                        <div className="contents_item">
                            <span className="views">
                                <GrView />
                                <span>{views}</span>
                            </span>
                            <span className="likes">
                                <img src={likesIcon} alt="likes-icon" />
                                <span>{likes}</span>
                            </span>
                            <span className="comments">
                                <img src={commentsIcon} alt="comments-icon" />
                                <span>{comments}</span>
                            </span>
                        </div>
                    </div>
                </PostDetailContainer>
            </PostDetailWrapper>
            <CommentsContainer>
                <CommentsPage boardNo={boardNo} />
            </CommentsContainer>
        </>
    );
}

export default PostDetail;
