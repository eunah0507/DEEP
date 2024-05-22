import { BeatLoader } from "react-spinners";
import styled from "styled-components";
import { palette } from "../../styles/palette";

const LoadingWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
`;

const LoadingContainer = styled.div`
    width: 100vw;
    height: calc(100% - 60px);
    margin-top: 450px;

    .loading_title {
        margin-top: 50px;
        text-align: center;
    }

    .loading_title span {
        color: ${palette.blue[6]};
        font-size: 2.4rem;
    }
`;

function Loading({ loading = true }) {
    return (
        <LoadingWrapper>
            <LoadingContainer>
                <BeatLoader
                    color="#1e88e5"
                    loading={loading}
                    size={20}
                    speedMultiplier={0.9}
                    margin={7}
                />
                <div className="loading_title">
                    <span>여러분들의 소중한 글들을 불러오고 있어요.</span>
                </div>
            </LoadingContainer>
        </LoadingWrapper>
    );
}

export default Loading;
