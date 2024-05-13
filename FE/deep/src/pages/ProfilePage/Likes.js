import { useEffect } from "react";
import axiosInstance from "../../apis/axiosInstance";
import { getCookie } from "../../apis/cookie";

function Likes() {
    useEffect(() => {
        axiosInstance
            .get("/deep/member/profile/like", {
                headers: {
                    Authorization: `${getCookie("Authorization")}`,
                },
            })
            .then((response) => {
                const data = response.data;

                console.log(data);
            })
            .catch((error) => console.log(error));
    }, []);

    return <div>likes</div>;
}

export default Likes;
