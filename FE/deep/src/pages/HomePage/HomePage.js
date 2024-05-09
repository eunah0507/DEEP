import Header from "../../components/Header/Header";
import { HomeContainer, HomeWrapper } from "./HomePage.styles";

function HomePage() {
    return (
        <>
            <Header />
            <HomeWrapper>
                <HomeContainer>home</HomeContainer>
            </HomeWrapper>
        </>
    );
}

export default HomePage;
