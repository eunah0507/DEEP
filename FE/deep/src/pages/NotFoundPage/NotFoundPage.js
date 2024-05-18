import { NotFoundContainer, NotFoundWrapper } from "./NotFoundPage.styles";
import deepLogo from "../../assets/images/deep-icon.png";

function NotFoundPage() {
    return (
        <NotFoundWrapper>
            <NotFoundContainer>
                <div className="deep_icon">
                    <img src={deepLogo} alt="deep icon" />
                </div>
                <div className="text_container">
                    <h3>앗! 페이지를 찾을 수가 없어요...</h3>
                    <p>
                        네트워크가 일시적으로 끊겼거나 페이지를 불러오지
                        못했습니다.
                    </p>
                    <p>잠시 후 다시 시도해 주세요.</p>
                </div>
            </NotFoundContainer>
        </NotFoundWrapper>
    );
}

export default NotFoundPage;
