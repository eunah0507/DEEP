import Button from "../../../components/Button/Button";
import { CommunityContainer, CommunityWrapper } from "./CommunityPage.styles";
import { useEffect, useState } from "react";
import axiosInstance from "../../../apis/axiosInstance";
import Post from "../Post/Post";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";
import { useNavigate } from "react-router-dom";

function CommunityPage() {
    const [posts, setPosts] = useState([]);
    const [pages, setPages] = useState(1);
    const [maxPages, setMaxPages] = useState(1);

    const navigate = useNavigate();

    const paginate = Array.from({ length: maxPages }, (_, p) => p + 1);

    useEffect(() => {
        axiosInstance
            .post("/deep/board/category", {
                category: "community",
                page: pages,
            })
            .then((response) => {
                setPosts(response.data);
                navigate(`/community?page=${pages}`);
            })
            .catch((error) => {
                console.log(error);
            });

        axiosInstance
            .post("/deep/board/post-page", {
                category: "community",
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
        <CommunityWrapper>
            <CommunityContainer>
                <div className="board_header">
                    <h3 className="board_title">자유 게시판</h3>
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
            </CommunityContainer>
        </CommunityWrapper>
    );
}

export default CommunityPage;
