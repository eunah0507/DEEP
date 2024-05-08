import { Link, useNavigate } from "react-router-dom";
import { SignUpWrapper, SignUpContainer } from "./SignUpStep2.styles";
import deepLogo from "../../../assets/images/deep-logo-header.svg";
import Button from "../../../components/Button/Button";
import Input from "../../../components/Input/Input";
import { useEffect, useState } from "react";
import { useDaumPostcodePopup } from "react-daum-postcode";
import axiosInstance from "../../../apis/axiosInstance";

function SignUpStep2(props) {
    const [id, setId] = useState("");
    const [pw, setPw] = useState("");
    const [pwCheck, setPwCheck] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [address, setAddress] = useState("");
    const [addressDetail, setAddressDetail] = useState("");
    const [phone, setPhone] = useState("");
    const [auth, setAuth] = useState("");
    const [authCheck, setAuthCheck] = useState("");

    const [isId, setIsId] = useState(false);
    const [isIdCheck, setIsIdCheck] = useState(false);
    const [isPw, setIsPw] = useState(false);
    const [isPwCheck, setIsPwCheck] = useState(false);
    const [isName, setIsName] = useState(false);
    const [isEmail, setIsEmail] = useState(false);
    const [isAddress, setIsAddress] = useState(false);
    const [isAddressDetail, setIsAddressDetail] = useState(false);
    const [isPhone, setIsPhone] = useState(false);
    const [isAuth, setIsAuth] = useState(false);
    const [isTimeOut, setIsTimeOut] = useState(false);
    const [disabled, setDisabled] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        if (
            isId &&
            isIdCheck &&
            isPw &&
            isPwCheck &&
            isName &&
            isEmail &&
            isAddress &&
            isAddressDetail &&
            isPhone &&
            isAuth
        ) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [
        isAddress,
        isAddressDetail,
        isAuth,
        isEmail,
        isId,
        isIdCheck,
        isName,
        isPhone,
        isPw,
        isPwCheck,
    ]);

    let currentId = "";

    const handleCheckId = (e) => {
        setId(e.target.value);

        const regex = /^[a-z0-9]{4,20}$/;

        if (regex.test(e.target.value)) {
            setIsId(true);
        } else {
            setIsId(false);
        }
    };

    const idDuplication = (e) => {
        e.preventDefault();

        if (isId) {
            axiosInstance
                .get("/deep/member/idcheck?memberID=" + id)
                .then((response) => {
                    if (response.status === 200) {
                        setIsIdCheck(response.data);
                        if (response.data) {
                            alert("사용 가능한 아이디입니다.");
                            currentId = id;
                        } else {
                            alert("이미 사용중인 아이디입니다.");
                        }
                    } else {
                        alert("사용 불가한 아이디입니다.");
                    }
                })
                .catch((error) => console.log(error));
        }
    };

    useEffect(() => {
        if (currentId !== id) {
            setIsIdCheck(false);
        }
    }, [currentId, id]);

    const handleCheckPw = (e) => {
        setPw(e.target.value);

        const regex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*?_.,]).{8,16}$/;

        if (regex.test(e.target.value)) {
            setIsPw(true);
        } else {
            setIsPw(false);
        }
    };

    const handleCheckPwCheck = (e) => {
        setPwCheck(e.target.value);

        if (pw === e.target.value) {
            setIsPwCheck(true);
        } else {
            setIsPwCheck(false);
        }
    };

    const handleCheckName = (e) => {
        setName(e.target.value);

        const regex = /^[a-zA-Z가-힣]{2,}$/;

        if (regex.test(e.target.value)) {
            setIsName(true);
        } else {
            setIsName(false);
        }
    };

    const handleCheckEmail = (e) => {
        setEmail(e.target.value);

        const regex =
            /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;

        if (regex.test(e.target.value)) {
            setIsEmail(true);
        } else {
            setIsEmail(false);
        }
    };

    const open = useDaumPostcodePopup(
        "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"
    );

    const handleComplete = (data) => {
        let fullAddress = data.address;
        let extraAddress = "";
        let zipAddress = "";

        if (data.addressType === "R") {
            if (data.bname !== "") {
                extraAddress += data.bname;
            }

            if (data.buildingName !== "") {
                extraAddress +=
                    extraAddress !== ""
                        ? `, ${data.buildingName}`
                        : data.buildingName;
            }

            if (data.zonecode !== "") {
                zipAddress += data.zonecode;
            }

            fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";

            fullAddress += `  [${zipAddress}]`;
        }

        setAddress(fullAddress);
        setZipCode(zipAddress);
        setIsAddress(true);
    };

    const searchAddress = (e) => {
        e.preventDefault();

        open({ onComplete: handleComplete });
    };

    const handleCheckAddressDetail = (e) => {
        setAddressDetail(e.target.value);

        const regex = /^[a-zA-Z가-힣0-9]{1,}$/;

        if (regex.test(e.target.value)) {
            setIsAddressDetail(true);
        } else {
            setIsAddressDetail(false);
        }
    };

    const handleCheckPhone = (e) => {
        const currentNumber = e.target.value
            .replace(/[^0-9]/g, "")
            .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3")
            .replace(/(\-{1,2})$/g, "");

        setPhone(currentNumber);

        const regex = /^010-[0-9]{4}-[0-9]{4}$/;

        if (regex.test(currentNumber)) {
            setIsPhone(true);
        } else {
            setIsPhone(false);
        }
    };

    const sendAuthNumber = (e) => {
        e.preventDefault();

        const phoneNumber = phone.replace("-", "");

        if (isPhone) {
            axiosInstance
                .post("/deep/member/signup/phone", {
                    memberPhone: phoneNumber,
                })
                .then((response) => {
                    setAuthCheck(response.data.authenticationNumber);
                })
                .catch((error) => console.log(error));
            alert(
                "인증번호가 발송되었습니다.\n전송된 인증번호를 입력 후 확인해 주세요."
            );
            setIsTimeOut(true);
        } else if (phoneNumber.length === 0) {
            alert("휴대폰 번호를 입력해 주세요.");
        }
    };

    const handleCheckAuth = (e) => {
        const currentNumber = e.target.value.replace(/[^0-9]/g, "");

        setAuth(currentNumber);
    };

    const checkAuthNumber = (e) => {
        e.preventDefault();

        if (isTimeOut) {
            if (auth === authCheck) {
                setIsAuth(true);
                alert("인증되었습니다.");
            } else {
                setIsAuth(false);
                alert("인증번호를 다시 확인해 주세요.");
            }
        }
    };

    const signUp = (e) => {
        e.preventDefault();

        const memberInfo = {
            memberID: id,
            memberPass: pw,
            memberName: name,
            memberMail: email,
            memberAddress: address,
            memberAddressDetail: addressDetail,
            memberZip: zipCode,
            memberPhone: phone,
        };

        axiosInstance
            .post("/deep/member/signup", memberInfo)
            .then((response) => {
                console.log(response);
                navigate("/signup/success");
                props.setStep(2);
            })
            .catch((error) => console.log(error));
    };

    return (
        <SignUpWrapper>
            <SignUpContainer>
                <div className="logo">
                    <Link to="/">
                        <img src={deepLogo} alt="deep-logo" />
                    </Link>
                </div>
                <form id="sign_up_form">
                    <div
                        className={
                            "form_item user_id " +
                            (!isId && id.length > 0 ? "error" : "")
                        }
                    >
                        <label htmlFor="user_id" className="input_title">
                            아이디
                        </label>
                        <div className="input_div">
                            <Input
                                type="text"
                                id="user_id"
                                label="아이디"
                                value={id}
                                maxLength="20"
                                placeholder="아이디 (4~20자의 영문 소문자, 숫자)"
                                onChange={handleCheckId}
                            />
                            <Button xSmallWidth onClick={idDuplication}>
                                확인
                            </Button>
                        </div>
                        <div className="noValid">
                            {!isId && id.length > 0 && (
                                <span>
                                    * 4~20자의 영문 소문자, 숫자만 사용
                                    가능합니다.
                                </span>
                            )}
                        </div>
                    </div>
                    <div
                        className={
                            "form_item user_pw " +
                            (!isPw && pw.length > 0 ? "error" : "")
                        }
                    >
                        <label htmlFor="user_pw" className="input_title">
                            비밀번호
                        </label>
                        <Input
                            type="password"
                            id="user_pw"
                            label="비밀번호"
                            value={pw}
                            maxLength="16"
                            placeholder="비밀번호 (8~16자의 영문 대/소문자, 숫자, 특수문자 포함)"
                            onChange={handleCheckPw}
                        />
                        <div className="noValid">
                            {!isPw && pw.length > 0 && (
                                <span>
                                    * 8~16자의 영문 대/소문자, 숫자,
                                    특수문자(!@#$%^&*?_.,)만 입력해 주세요.
                                </span>
                            )}
                        </div>
                    </div>
                    <div
                        className={
                            "form_item user_pw " +
                            (!isPwCheck && pwCheck.length > 0 ? "error" : "")
                        }
                    >
                        <Input
                            type="password"
                            label="비밀번호 확인"
                            value={pwCheck}
                            maxLength="16"
                            placeholder="비밀번호 확인"
                            onChange={handleCheckPwCheck}
                        />
                        <div className="noValid">
                            {!isPwCheck && pwCheck.length > 0 && (
                                <span>* 비밀번호가 일치하지 않습니다.</span>
                            )}
                        </div>
                    </div>
                    <div
                        className={
                            "form_item user_name " +
                            (!isName && name.length > 0 ? "error" : "")
                        }
                    >
                        <label htmlFor="user_name" className="input_title">
                            이름
                        </label>
                        <Input
                            type="text"
                            id="user_name"
                            label="이름"
                            value={name}
                            placeholder="이름"
                            onChange={handleCheckName}
                        />
                        <div className="noValid">
                            {!isName && name.length > 0 && (
                                <span>
                                    * 한글, 영문 대/소문자를 사용해 주세요.
                                    (특수기호, 공백 사용 불가)
                                </span>
                            )}
                        </div>
                    </div>
                    <div
                        className={
                            "form_item user_email " +
                            (!isEmail && email.length > 0 ? "error" : "")
                        }
                    >
                        <label htmlFor="user_email" className="input_title">
                            이메일
                        </label>
                        <Input
                            type="email"
                            id="user_email"
                            label="이메일"
                            value={email}
                            maxLength="50"
                            placeholder="이메일"
                            onChange={handleCheckEmail}
                        />
                        <div className="noValid">
                            {!isEmail && email.length > 0 && (
                                <span>
                                    * 이메일의 형식이 올바르지 않습니다.
                                </span>
                            )}
                        </div>
                    </div>
                    <div className="form_item user_address">
                        <label htmlFor="user_address" className="input_title">
                            주소
                        </label>
                        <div className="input_div">
                            <Input
                                type="text"
                                id="user_address"
                                label="주소"
                                value={address}
                                placeholder="주소"
                                disabled
                            />
                            <Button xSmallWidth onClick={searchAddress}>
                                찾기
                            </Button>
                        </div>
                    </div>
                    <div
                        className={
                            "form_item user_address_detail " +
                            (!isAddressDetail && addressDetail.length > 0
                                ? "error"
                                : "")
                        }
                    >
                        <Input
                            type="text"
                            label="상세주소"
                            value={addressDetail}
                            maxLength="50"
                            placeholder="상세주소"
                            onChange={handleCheckAddressDetail}
                        />
                        <div className="noValid">
                            {!isAddressDetail && addressDetail.length > 0 && (
                                <span>* 상세주소를 입력해 주세요.</span>
                            )}
                        </div>
                    </div>
                    <div
                        className={
                            "form_item user_phone " +
                            (!isPhone && phone.length > 0 ? "error" : "")
                        }
                    >
                        <label htmlFor="user_phone" className="input_title">
                            휴대폰 번호
                        </label>
                        <div className="input_div">
                            <Input
                                type="text"
                                id="user_phone"
                                label="휴대폰 번호"
                                value={phone}
                                maxLength="13"
                                placeholder="휴대폰 번호"
                                onChange={handleCheckPhone}
                            />
                            <Button xSmallWidth onClick={sendAuthNumber}>
                                {isTimeOut ? "재전송" : "인증"}
                            </Button>
                        </div>
                        <div className="noValid">
                            {!isPhone && phone.length > 0 && (
                                <span>
                                    * 휴대폰 번호의 형식이 올바르지 않습니다.
                                </span>
                            )}
                        </div>
                    </div>
                    <div className="form_item user_auth">
                        <div className="input_div">
                            <Input
                                type="text"
                                label="인증번호"
                                value={auth}
                                maxLength="6"
                                placeholder="인증번호 (숫자 6자리 입력)"
                                onChange={handleCheckAuth}
                            />
                            <Button
                                xSmallWidth
                                onClick={checkAuthNumber}
                                disabled={!isTimeOut}
                            >
                                확인
                            </Button>
                        </div>
                    </div>
                    <Button
                        largeWidth
                        largeFont
                        disabled={disabled}
                        onClick={signUp}
                    >
                        회원가입
                    </Button>
                </form>
                <div className="login">
                    <span>이미 회원이신가요?</span>
                    <Link to="/login">로그인</Link>
                </div>
            </SignUpContainer>
        </SignUpWrapper>
    );
}

export default SignUpStep2;
