import { Link } from "react-router-dom";
import { FindPwContainer, FindPwWrapper } from "./FindPwPage.styles";
import deepLogo from "../../assets/images/deep-logo-header.svg";
import { useState } from "react";
import FindPw from "./FindPw/FindPw";
import FindPwSuccess from "./FindPw/FindPwSuccess";

function FindPwPage() {
    const [step, setStep] = useState(0);
    const [userEmail, setUserEmail] = useState("");

    return (
        <FindPwWrapper>
            <FindPwContainer>
                <div className="logo">
                    <Link to="/">
                        <img src={deepLogo} alt="deep-logo" />
                    </Link>
                </div>
                <div>
                    {step === 0 ? (
                        <FindPw
                            setStep={(s) => setStep(s)}
                            setUserEmail={(email) => setUserEmail(email)}
                        />
                    ) : (
                        <FindPwSuccess userEmail={userEmail} />
                    )}
                </div>
            </FindPwContainer>
        </FindPwWrapper>
    );
}

export default FindPwPage;
