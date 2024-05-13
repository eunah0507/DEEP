import { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import { HomeContainer, HomeWrapper } from "./HomePage.styles";
import { getCookie } from "../../apis/cookie";
import { useCookies } from "react-cookie";

function HomePage() {
    const [accessToken, setAccessToken] = useState("");
    const [refreshToken, setRefreshToken] = useState("");
    const [cookies, setCookie] = useCookies([]);

    useEffect(() => {
        setAccessToken(`${getCookie("Authorization")}`);
        setRefreshToken(`${getCookie("Refresh")}`);

        console.log(accessToken);
        console.log(refreshToken);
        console.log(cookies);
        // console.log(`${getCookie("Auth")}`);
        // console.log(`${getCookie("Refresh")}`);
    }, []);

    return (
        <>
            <Header />
            <HomeWrapper>
                <HomeContainer>
                    <div className="notice">
                        <h3>공지사항</h3>
                    </div>
                </HomeContainer>
            </HomeWrapper>
        </>
    );
}

export default HomePage;
