import { useMemo, useState } from "react";
import { HomeContainer, HomeWrapper } from "./HomePage.styles";
import axiosInstance from "../../apis/axiosInstance";
import MainPost from "./MainPost/MainPost";

function HomePage() {
    const [notice, setNotice] = useState([]);
    const [best, setBest] = useState([]);
    const [skill, setSkill] = useState([]);
    const [qna, setQna] = useState([]);
    const [community, setCommunity] = useState([]);

    useMemo(() => {
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
            })
            .catch((error) => {
                console.log(error);
                alert("게시물 조회에 실패하였습니다.");
            });
    }, []);

    return (
        <HomeWrapper>
            <HomeContainer>
                <div className="notice">
                    <h3>공지사항</h3>
                    <div className="notice_content">
                        {notice.length > 0 && <p>{notice[0].boardTitle}</p>}
                    </div>
                </div>
                <div className="boards">
                    <div className="best board">
                        <h4>인기글</h4>
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
                        <h4>기술 트렌드</h4>
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
                        <h4>QnA</h4>
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
                        <h4>커뮤니티</h4>
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
        </HomeWrapper>
    );
}

export default HomePage;
