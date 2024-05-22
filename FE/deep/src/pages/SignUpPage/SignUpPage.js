import { useState } from "react";
import SignUpStep1 from "./Step/SignUpStep1";
import SignUpStep2 from "./Step/SignUpStep2";
import SignUpSuccess from "./Step/SignUpSuccess";

function SignUpPage() {
    const [step, setStep] = useState(0);

    return (
        <div>
            {step === 0 ? <SignUpStep1 setStep={(s) => setStep(s)} /> : <></>}
            {step === 1 ? <SignUpStep2 setStep={(s) => setStep(s)} /> : <></>}
            {step === 2 ? <SignUpSuccess setStep={(s) => setStep(s)} /> : <></>}
        </div>
    );
}

export default SignUpPage;
