import Header from "../../components/Header/Header";
import mainBg from "../../assets/images/deep-bg-main.jpg";
import arrowRight from "../../assets/images/deep-arrow-right.svg";
import {
    MainBgContainer,
    MainContentsContainer,
    MainSection,
} from "./MainPage.styles";
import { StartButton } from "./MainPage.styles";

function MainPage() {
    return (
        <>
            <Header />
            <MainSection>
                <MainBgContainer>
                    <img src={mainBg} alt="main-background" />
                </MainBgContainer>
                <MainContentsContainer>
                    <p>다양한 개발자들이 모여있는 커뮤니티</p>
                    <p>DEEP</p>
                    <StartButton to="/login">
                        <span>지금 시작하기</span>
                        <img src={arrowRight} alt="arrow-right" />
                    </StartButton>
                </MainContentsContainer>
            </MainSection>
        </>
    );
}

export default MainPage;
