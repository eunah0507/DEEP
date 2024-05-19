import { useEffect, useState } from "react";
import axiosInstance from "../../../apis/axiosInstance";

function PostDetail() {
    const [boardNo, setBoardNo] = useState(0);

    useEffect(() => {
        setBoardNo(25);

        axiosInstance
            .post("/deep/board/detail", { boardNo: boardNo })
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return <div>postdetail</div>;
}

export default PostDetail;
