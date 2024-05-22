import Button from "../../../components/Button/Button";
import { SkillContainer, SkillWrapper } from "./SkillPage.styles";
import { useEffect, useState } from "react";
import axiosInstance from "../../../apis/axiosInstance";
import Post from "../Post/Post";

function SkillPage() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axiosInstance
            .post("/deep/board/category", {
                category: "skill",
                page: 1,
            })
            .then((response) => {
                setPosts(response.data);
            })
            .catch((error) => {
                console.log(error);
            });

        axiosInstance
            .post("/deep/board/post-page", {
                category: "skill",
            })
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <SkillWrapper>
            <SkillContainer>
                <div className="board_header">
                    <h3 className="board_title">기술 트렌드</h3>
                    <Button xSmallWidth inverted to="/post/create">
                        글쓰기
                    </Button>
                </div>
                <ul className="posts">
                    {posts.map((post) => {
                        return <Post post={post} />;
                    })}
                </ul>
            </SkillContainer>
        </SkillWrapper>
    );
}

export default SkillPage;
