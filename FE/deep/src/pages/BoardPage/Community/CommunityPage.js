import Button from "../../../components/Button/Button";
import { CommunityContainer, CommunityWrapper } from "./CommunityPage.styles";
import { useEffect, useState } from "react";
import axiosInstance from "../../../apis/axiosInstance";
import Post from "../Post/Post";

function CommunityPage() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axiosInstance
            .post("/deep/board/category", {
                category: "community",
                page: 1,
            })
            .then((response) => {
                setPosts(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

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
            </CommunityContainer>
        </CommunityWrapper>
    );
}

export default CommunityPage;
