import Button from "../../../components/Button/Button";
import { QnAContainer, QnAWrapper } from "./QnAPage.styles";
import { useEffect, useState } from "react";
import axiosInstance from "../../../apis/axiosInstance";
import Post from "../Post/Post";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";
import { useNavigate } from "react-router-dom";

function QnAPage() {
    const [posts, setPosts] = useState([]);
    const [pages, setPages] = useState(1);
    const [maxPages, setMaxPages] = useState(1);

    const navigate = useNavigate();

    const paginate = Array.from({ length: maxPages }, (_, p) => p + 1);

    useEffect(() => {
        axiosInstance
            .post("/deep/board/category", {
                category: "qna",
                page: pages,
            })
            .then((response) => {
                setPosts(response.data);
                navigate(`/qna?page=${pages}`);
            })
            .catch((error) => {
                console.log(error);
            });

        axiosInstance
            .post("/deep/board/post-page", {
                category: "qna",
            })
            .then((response) => {
                setMaxPages(response.data.maxPage);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [pages]);

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
        <QnAWrapper>
            <QnAContainer>
                <div className="board_header">
                    <h3 className="board_title">QnA</h3>
                    <Button xSmallWidth inverted to="/post/create">
                        글쓰기
                    </Button>
                </div>
                <ul className="posts">
                    {posts.map((post) => {
                        return <Post post={post} />;
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
            </QnAContainer>
        </QnAWrapper>
    );
}

export default QnAPage;
