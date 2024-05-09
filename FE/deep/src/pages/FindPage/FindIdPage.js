import { Link } from "react-router-dom";
import { FindIdContainer, FindIdWrapper } from "./FindIdPage.styles";
import deepLogo from "../../assets/images/deep-logo-header.svg";
import { useState } from "react";
import FindId from "./FindId/FindId";
import FindIdSuccess from "./FindId/FindIdSuccess";

function FindIdPage() {
    const [step, setStep] = useState(0);
    const [findId, setFindId] = useState([]);

    console.log(findId);

    return (
        <FindIdWrapper>
            <FindIdContainer>
                <div className="logo">
                    <Link to="/">
                        <img src={deepLogo} alt="deep-logo" />
                    </Link>
                </div>
                <div>
                    {step === 0 ? (
                        <FindId
                            setStep={(s) => setStep(s)}
                            setFindId={(info) => setFindId([...info])}
                        />
                    ) : (
                        <FindIdSuccess findId={findId} />
                    )}
                </div>
            </FindIdContainer>
        </FindIdWrapper>
    );
}

export default FindIdPage;
