import likesIcon from "../../../assets/images/deep-icon-likes.svg";
import userProfile from "../../../assets/images/deep-profile-blue.png";
import { useEffect, useState } from "react";
import { NoticeContainer, NoticeWrapper } from "./NoticePage.styles";
import { GrView } from "react-icons/gr";
import axiosInstance from "../../../apis/axiosInstance";

function NoticePage() {
    const [notices, setNotices] = useState([]);

    useEffect(() => {
        axiosInstance
            .post("/deep/board/category", {
                category: "notice",
                page: 1,
            })
            .then((response) => {
                setNotices(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const noticeCreatedTime = notices.map((notice) => {
        return notice.boardCreatedTime.split("T")[0];
    });

    return (
        <NoticeWrapper>
            <NoticeContainer>
                <div className="board_header">
                    <h3 className="board_title">공지사항</h3>
                </div>
                <ul className="notices">
                    {notices.map((notice, index) => {
                        return (
                            <li className="notice">
                                <div className="user_profile">
                                    {notice.memberFile === null ? (
                                        <img
                                            className="user_profile_img"
                                            src={userProfile}
                                            alt="user-profile-image"
                                        />
                                    ) : (
                                        <img
                                            className="user_profile_img"
                                            src={notice.memberFile}
                                            alt="user-profile-image"
                                        />
                                    )}
                                    <span className="user_name">
                                        {notice.memberNickName}
                                    </span>
                                </div>
                                <h4 className="notice_title">
                                    {notice.boardTitle}
                                </h4>
                                <p className="notice_content">
                                    {notice.boardContent}
                                </p>
                                <div className="contents_container">
                                    <div className="content_time">
                                        <span>
                                            {noticeCreatedTime[
                                                index
                                            ].replaceAll("-", ".")}
                                        </span>
                                    </div>
                                    <div className="contents_item">
                                        <span className="views">
                                            <GrView />
                                            <span>{notice.view}</span>
                                        </span>
                                        <span className="likes">
                                            <img
                                                src={likesIcon}
                                                alt="likes-icon"
                                            />
                                            <span>{notice.like}</span>
                                        </span>
                                    </div>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </NoticeContainer>
        </NoticeWrapper>
    );
}

export default NoticePage;
