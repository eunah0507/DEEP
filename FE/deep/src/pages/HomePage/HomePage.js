import { useEffect, useMemo, useState } from "react";
import { HomeContainer, HomeWrapper } from "./HomePage.styles";
import axiosInstance from "../../apis/axiosInstance";
import MainPost from "./MainPost/MainPost";
import Loading from "../../components/Loading/Loading";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../store/memberStore";

function HomePage() {
    const [loading, setLoading] = useState(true);
    const [notice, setNotice] = useState([]);
    const [best, setBest] = useState([]);
    const [skill, setSkill] = useState([]);
    const [qna, setQna] = useState([]);
    const [community, setCommunity] = useState([]);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    useEffect(() => {
        axiosInstance
            .get("/deep/board/main-index")
            .then((response) => {
                const noticePosts = [];
                const bestPosts = [];
                const skillPosts = [];
                const qnaPosts = [];
                const communityPosts = [];

                response.data.forEach((post) => {
                    if (post.isBest) {
                        bestPosts.push(post);
                    } else {
                        switch (post.category) {
                            case "notice":
                                noticePosts.push(post);
                                break;
                            case "skill":
                                skillPosts.push(post);
                                break;
                            case "qna":
                                qnaPosts.push(post);
                                break;
                            case "community":
                                communityPosts.push(post);
                                break;
                            default:
                                break;
                        }
                    }
                });

                setNotice(noticePosts);
                setBest(bestPosts);
                setSkill(skillPosts);
                setQna(qnaPosts);
                setCommunity(communityPosts);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                alert("게시물 조회에 실패하였습니다.");
            });
    }, []);

    const handleClickNotice = () => {
        navigate("/notice");
    };

    const handleClickBest = () => {
        navigate("/best");
    };

    const handleClickSkill = () => {
        navigate("/skill");
    };

    const handleClickQna = () => {
        navigate("/qna");
    };

    const handleClickCommunity = () => {
        navigate("/community");
    };

    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                <HomeWrapper>
                    <HomeContainer>
                        <div className="notice">
                            <h3 onClick={handleClickNotice}>공지사항</h3>
                            <div className="notice_content">
                                {notice.length > 0 && (
                                    <p>{notice[0].boardTitle}</p>
                                )}
                            </div>
                        </div>
                        <div className="boards">
                            <div className="best board">
                                <h4 onClick={handleClickBest}>인기글</h4>
                                <ul>
                                    {best.map((post) => {
                                        return (
                                            <MainPost
                                                post={post}
                                                boardNo={post.boardNo}
                                                category={post.category}
                                                nickName={post.memberNickName}
                                                random={post.memberRandom}
                                            />
                                        );
                                    })}
                                </ul>
                            </div>
                            <div className="skill board">
                                <h4 onClick={handleClickSkill}>기술 트렌드</h4>
                                <ul>
                                    {skill.map((post) => {
                                        return (
                                            <MainPost
                                                post={post}
                                                boardNo={post.boardNo}
                                                category={post.category}
                                                nickName={post.memberNickName}
                                                random={post.memberRandom}
                                            />
                                        );
                                    })}
                                </ul>
                            </div>
                        </div>
                        <div className="boards">
                            <div className="qna board">
                                <h4 onClick={handleClickQna}>QnA</h4>
                                <ul>
                                    {qna.map((post) => {
                                        return (
                                            <MainPost
                                                post={post}
                                                boardNo={post.boardNo}
                                                category={post.category}
                                                nickName={post.memberNickName}
                                                random={post.memberRandom}
                                            />
                                        );
                                    })}
                                </ul>
                            </div>
                            <div className="community board">
                                <h4 onClick={handleClickCommunity}>커뮤니티</h4>
                                <ul>
                                    {community.map((post) => {
                                        return (
                                            <MainPost
                                                post={post}
                                                boardNo={post.boardNo}
                                                category={post.category}
                                                nickName={post.memberNickName}
                                                random={post.memberRandom}
                                            />
                                        );
                                    })}
                                </ul>
                            </div>
                        </div>
                    </HomeContainer>
                    <div className="qr_code"></div>
                </HomeWrapper>
            )}
        </>
    );
}

export default HomePage;
