import { FindPwContainer } from "./FindPw.styles";
import Input from "../../../components/Input/Input";
import Button from "../../../components/Button/Button";
import { useEffect, useState } from "react";
import axiosInstance from "../../../apis/axiosInstance";
import { Link, useNavigate } from "react-router-dom";

function FindPw(props) {
    const [name, setName] = useState("");
    const [id, setId] = useState("");
    const [phone, setPhone] = useState("");
    const [auth, setAuth] = useState("");
    const [authCheck, setAuthCheck] = useState("");

    const [isName, setIsName] = useState(false);
    const [isId, setIsId] = useState(false);
    const [isPhone, setIsPhone] = useState(false);
    const [isAuth, setIsAuth] = useState(false);
    const [isTimeOut, setIsTimeOut] = useState(false);
    const [disabled, setDisabled] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        if (isName && isId && isPhone && isAuth) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [isAuth, isId, isName, isPhone]);

    const handleCheckName = (e) => {
        setName(e.target.value);

        const regex = /^[a-zA-Z가-힣]{2,}$/;
        if (regex.test(e.target.value)) {
            setIsName(true);
        } else {
            setIsName(false);
        }
    };

    const handleCheckId = (e) => {
        setId(e.target.value);
        const regex = /^[a-z0-9]{4,20}$/;
        if (regex.test(e.target.value)) {
            setIsId(true);
        } else {
            setIsId(false);
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

    const findPw = (e) => {
        e.preventDefault();

        const memberInfo = {
            memberID: id,
            memberName: name,
            memberPhone: phone,
        };

        axiosInstance
            .post("/deep/member/pwfind", memberInfo)
            .then((response) => {
                props.setUserEmail(response.data.memberMail);
                navigate("/find-password/reset");
                props.setStep(1);
            })
            .catch((error) => {
                console.log(error);
                alert("입력하신 정보를 찾을 수 없습니다.\n다시 확인해 주세요.");
            });
    };

    return (
        <FindPwContainer>
            <div className="title">비밀번호 찾기</div>
            <form id="find_pw">
                <div className="form_item user_name">
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
                </div>
                <div className="form_item user_id">
                    <label htmlFor="user_id" className="input_title">
                        아이디
                    </label>
                    <Input
                        type="text"
                        id="user_id"
                        label="아이디"
                        value={id}
                        maxLength="20"
                        placeholder="아이디 (4~20자의 영문 소문자, 숫자)"
                        onChange={handleCheckId}
                    />
                </div>
                <div className="form_item user_phone">
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
                    mediumWidth
                    largeFont
                    disabled={disabled}
                    onClick={findPw}
                >
                    비밀번호 찾기
                </Button>
            </form>
            <div className="sign_up">
                <span>회원이 아니신가요?</span>
                <Link to="/signup/terms-agree">회원가입</Link>
            </div>
        </FindPwContainer>
    );
}

export default FindPw;
