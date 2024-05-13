import { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import { HomeContainer, HomeWrapper } from "./HomePage.styles";
import { useCookies } from "react-cookie";

function HomePage() {
    const [cookies, setCookie] = useCookies([]);

    useEffect(() => {}, []);

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
