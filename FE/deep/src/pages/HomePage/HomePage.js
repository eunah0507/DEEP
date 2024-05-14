import { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import { HomeContainer, HomeWrapper } from "./HomePage.styles";
import { useCookies } from "react-cookie";
import { getCookie } from "../../apis/cookie";

function HomePage() {
    const [cookies, setCookie] = useCookies([]);

    useEffect(() => {
        console.log(cookies);
        console.log(`${getCookie("Access")}`);
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
