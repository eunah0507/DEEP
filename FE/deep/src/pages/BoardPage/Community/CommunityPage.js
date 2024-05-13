import Button from "../../../components/Button/Button";
import { CommunityContainer, CommunityWrapper } from "./CommunityPage.styles";
import userProfile from "../../../assets/images/deep-profile-blue.png";
import { GrView } from "react-icons/gr";
import { BiLike } from "react-icons/bi";
import { useEffect } from "react";

function CommunityPage() {
    useEffect(() => {
        const data = [
            {
                boardNo: 1,
                boardTitle: "다들 연봉 얼마세요?",
                boardContent: "저는 연봉이 이번에 500만원 올랐네요",
                memberNickName: "주니어개발자",
                memberRandom: "#1234",
                boardCreatedTime: "2024-04-05-11-30",
                view: 250,
                like: 10,
                reply: 7,
                tag: ["#연봉", "#백엔드", "#프론트엔드"],
            },

            {
                boardNo: 55,
                boardTitle: "튼튼발자 vs 비실발자",
                boardContent: "튼튼발자들 운동하라고 그만 괴롭혀",
                memberNickName: "로또1등가보자고",
                memberRandom: "#1234",
                boardCreatedTime: "2024-04-05-11-30",
                view: 250,
                like: 15,
                reply: 3,
                tag: ["#헬스", "#오운완"],
            },

            {
                boardNo: 9521,
                boardTitle: "따봉제프딘도와줘요",
                boardContent: "배포 성공 제발 도와줘요",
                memberNickName: "누가기도덜했어",
                memberRandom: "#1234",
                boardCreatedTime: "2024-04-05-11-30",
                view: 250,
                like: 8,
                reply: 5,
                tag: ["#제프딘", "#살려줘요"],
            },
        ];
    }, []);

    return (
        <CommunityWrapper>
            <CommunityContainer>
                <h3 className="board_title">자유 게시판</h3>
                <ul>
                    <li className="content">
                        <img src={userProfile} alt="user-profile-image" />
                        <span>자바스크립트미만잡</span>
                        <h4 className="content_title">
                            프론트에서 쿠키 설정할 때 주의할 점
                        </h4>
                        <p>
                            프론트에서 쿠키 설정할 때 주의할 점에 대해
                            알아보겠습니다.
                        </p>
                        <div className="tags">
                            <ul>
                                <li className="tag">#react</li>
                            </ul>
                        </div>
                        <div className="contents">
                            <span className="views">
                                <GrView />
                                <span>51</span>
                            </span>
                            <span className="likes">
                                <BiLike />
                                <span>3</span>
                            </span>
                            <span className="comments"></span>
                        </div>
                    </li>
                </ul>
                <Button xSmallWidth inverted>
                    글쓰기
                </Button>
            </CommunityContainer>
        </CommunityWrapper>
    );
}

export default CommunityPage;
