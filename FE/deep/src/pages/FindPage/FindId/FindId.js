import { FindIdContainer } from "./FindId.styles";
import Input from "../../../components/Input/Input";
import Button from "../../../components/Button/Button";
import { useEffect, useState } from "react";
import axiosInstance from "../../../apis/axiosInstance";
import { Link, useNavigate } from "react-router-dom";

function FindId(props) {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [auth, setAuth] = useState("");
    const [authCheck, setAuthCheck] = useState("");

    const [isName, setIsName] = useState(false);
    const [isPhone, setIsPhone] = useState(false);
    const [isAuth, setIsAuth] = useState(false);
    const [isTimeOut, setIsTimeOut] = useState(false);
    const [disabled, setDisabled] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        if (isName && isPhone && isAuth) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [isAuth, isName, isPhone]);

    const handleCheckName = (e) => {
        setName(e.target.value);

        const regex = /^[a-zA-Z가-힣]{2,}$/;
        if (regex.test(e.target.value)) {
            setIsName(true);
        } else {
            setIsName(false);
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

    const findId = (e) => {
        e.preventDefault();

        const memberInfo = {
            memberName: name,
            memberPhone: phone,
        };

        axiosInstance
            .post("/deep/member/idfind", memberInfo)
            .then((response) => {
                const [findId, date] = response.data.map((data) => {
                    const date = new Date(data.memberDate);
                    date.setHours(date.getHours() + 9);
                    const year = date.getFullYear();
                    const month = ("0" + (date.getMonth() + 1)).slice(-2);
                    const day = ("0" + date.getDate()).slice(-2);
                    const signUpDate = `${year}.${month}.${day}`;

                    return [data.memberID, signUpDate];
                });
                props.setFindId([findId, date]);
                navigate("/find-id/done");
                props.setStep(1);
            })
            .catch((error) => {
                console.log(error);
                alert("회원님의 정보와 일치하는 ID가 없습니다.");
            });
    };

    return (
        <FindIdContainer>
            <div className="title">아이디 찾기</div>
            <form id="find_id">
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
                    onClick={findId}
                >
                    아이디 찾기
                </Button>
            </form>
            <div className="sign_up">
                <span>회원이 아니신가요?</span>
                <Link to="/signup/terms-agree">회원가입</Link>
            </div>
        </FindIdContainer>
    );
}

export default FindId;
