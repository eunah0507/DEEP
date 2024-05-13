import { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import { HomeContainer, HomeWrapper } from "./HomePage.styles";
import { getCookie } from "../../apis/cookie";
import { useCookies } from "react-cookie";

function HomePage() {
    const [cookies, setCookie] = useCookies([]);

    useEffect(() => {
        console.log(cookies);
        console.log(cookies.Authorization);
        console.log(cookies.Refresh);
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
