import Button from "../../../components/Button/Button";
import { QnAContainer, QnAWrapper } from "./QnAPage.styles";
import { useEffect, useState } from "react";
import axiosInstance from "../../../apis/axiosInstance";
import Post from "../Post/Post";

function QnAPage() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axiosInstance
            .post("/deep/board/category", {
                category: "qna",
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
            </QnAContainer>
        </QnAWrapper>
    );
}

export default QnAPage;
