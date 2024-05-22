import likesIcon from "../../../assets/images/deep-icon-likes.svg";
import userProfile from "../../../assets/images/deep-profile-blue.png";
import { useEffect, useState } from "react";
import { NoticeContainer, NoticeWrapper } from "./NoticePage.styles";
import { GrView } from "react-icons/gr";
import axiosInstance from "../../../apis/axiosInstance";
import { useNavigate } from "react-router-dom";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";

function NoticePage() {
    const [notices, setNotices] = useState([]);
    const [pages, setPages] = useState(1);
    const [maxPages, setMaxPages] = useState(1);

    const navigate = useNavigate();

    const paginate = Array.from({ length: maxPages }, (_, p) => p + 1);

    useEffect(() => {
        axiosInstance
            .post("/deep/board/category", {
                category: "notice",
                page: pages,
            })
            .then((response) => {
                setNotices(response.data);
                navigate(`/notice?page=${pages}`);
            })
            .catch((error) => {
                console.log(error);
            });

        axiosInstance
            .post("/deep/board/post-page", {
                category: "notice",
            })
            .then((response) => {
                setMaxPages(response.data.maxPage);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [pages]);

    const noticeCreatedTime = notices.map((notice) => {
        return notice.boardCreatedTime.split("T")[0];
    });

    const handleClickPrev = async () => {
        if (pages > 1) {
            setPages(pages - 1);
        } else {
            setPages(pages);
        }
    };

    const handleClickPage = (e, index) => {
        setPages(index + 1);
    };

    const handleClickNext = async () => {
        if (pages < maxPages) {
            setPages(pages + 1);
        } else {
            setPages(pages);
        }
    };

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
                <ul className="paginate">
                    <li className="prev" onClick={handleClickPrev}>
                        <GoChevronLeft />
                    </li>
                    {paginate.map((page, index) => {
                        return (
                            <li
                                className="page"
                                onClick={(e) => handleClickPage(e, index)}
                            >
                                {page}
                            </li>
                        );
                    })}
                    <li className="next" onClick={handleClickNext}>
                        <GoChevronRight />
                    </li>
                </ul>
            </NoticeContainer>
        </NoticeWrapper>
    );
}

export default NoticePage;
