import { useEffect } from "react";
import axiosInstance from "../../apis/axiosInstance";
import { getCookie } from "../../apis/cookie";
import { useCookies } from "react-cookie";

function Likes() {
    const [cookies, setCookie] = useCookies([]);

    useEffect(() => {
        axiosInstance
            .get("/deep/member/profile/like", {
                headers: {
                    Authorization: `${cookies.Access}`,
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
