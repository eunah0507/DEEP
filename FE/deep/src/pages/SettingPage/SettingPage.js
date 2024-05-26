import { useEffect, useState } from "react";
import {
    SettingContainer,
    SettingWrapper,
    UserSettingContainer,
} from "./SettingPage.styles";
import { SlArrowRight } from "react-icons/sl";
import axiosInstance from "../../apis/axiosInstance";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";

function SettingPage() {
    const [name, setName] = useState("");
    const [id, setId] = useState("");
    const [date, setDate] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    const [newPw, setNewPw] = useState("");
    const [newPwCheck, setNewPwCheck] = useState("");

    const [isOpenEmail, setIsOpenEmail] = useState(false);
    const [isOpenPw, setIsOpenPw] = useState(false);
    const [isOpenAddress, setIsOpenAddress] = useState(false);
    const [isOpenPhone, setIsOpenPhone] = useState(false);

    const [isNewPw, setIsNewPw] = useState(false);
    const [isNewPwCheck, setIsNewPwCheck] = useState(false);

    useEffect(() => {
        axiosInstance
            .get("/deep/member/info")
            .then((response) => {
                const data = response.data;

                const date = new Date(data.memberCreated);
                date.setHours(date.getHours() + 9);
                const year = date.getFullYear();
                const month = ("0" + (date.getMonth() + 1)).slice(-2);
                const day = ("0" + date.getDate()).slice(-2);
                const signUpDate = `${year}.${month}.${day}`;

                const phoneNumber = data.memberPhone.replace(
                    /^(\d{2,3})(\d{3,4})(\d{4})$/,
                    `$1-$2-$3`
                );

                setName(data.memberName);
                setId(data.memberID);
                setDate(signUpDate);
                setEmail(data.memberMail);
                setPhone(phoneNumber);
            })
            .catch((error) => console.log(error));
    }, []);

    const handleOpenEmail = () => {};

    const handleOpenPw = () => {
        setIsOpenPw(true);
    };

    const handleClosePw = () => {
        setIsOpenPw(false);
    };

    const handleCheckNewPw = (e) => {
        setNewPw(e.target.value);

        const regex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*?]).{8,16}$/;

        if (regex.test(e.target.value)) {
            setIsNewPw(true);
        } else {
            setIsNewPw(false);
        }
    };

    const handleCheckNewPwCheck = (e) => {
        setNewPwCheck(e.target.value);

        if (newPw === e.target.value) {
            setIsNewPwCheck(true);
        } else {
            setIsNewPwCheck(false);
        }
    };

    const changeNewPw = () => {
        if (isNewPw && isNewPwCheck) {
            axiosInstance
                .put("/deep/member/modify-pass", { memberPass: newPw })
                .then((response) => {
                    alert("비밀번호 변경이 완료되었습니다.");
                    setIsOpenPw(false);
                })
                .catch((error) => {
                    console.log(error);
                    alert("비밀번호 변경에 실패했습니다.\n다시 시도해 주세요.");
                });
        } else {
            alert("비밀번호를 다시 확인해 주세요.");
        }
    };

    const handleOpenAddress = () => {};

    const handleOpenPhone = () => {};

    return (
        <SettingWrapper>
            <SettingContainer>
                <h2 className="title">설정</h2>
                <div className="user_info_item">
                    <h3 className="setting_title">내 가입 정보</h3>
                    <ul>
                        <li className="user_info">
                            <span>이름</span>
                            <span>{name}</span>
                        </li>
                        <li className="user_info">
                            <span>아이디</span>
                            <span>{id}</span>
                        </li>
                        <li className="user_info">
                            <span>가입일자</span>
                            <span>{date}</span>
                        </li>
                    </ul>
                </div>
                <div className="user_info_item user_setting">
                    <h3 className="setting_title">계정</h3>
                    <ul>
                        <li className="user_info">
                            <span>이메일 변경</span>
                            <span>
                                {email}
                                <SlArrowRight />
                            </span>
                        </li>
                        <li className="user_info" onClick={handleOpenPw}>
                            <span>비밀번호 변경</span>
                            <span>
                                변경하기
                                <SlArrowRight />
                            </span>
                        </li>
                        <li className="user_info">
                            <span>주소 변경</span>
                            <span>
                                변경하기
                                <SlArrowRight />
                            </span>
                        </li>
                        <li className="user_info">
                            <span>휴대폰 번호 변경</span>
                            <span>
                                {phone}
                                <SlArrowRight />
                            </span>
                        </li>
                    </ul>
                </div>
                <UserSettingContainer className={isOpenPw ? "" : "hidden"}>
                    <div className="user_pw_container">
                        <h4 className="user_info_title">비밀번호 변경</h4>
                        <div
                            className={
                                "user_pw_setting " +
                                (!isNewPw && newPw.length > 0 ? "error" : "")
                            }
                        >
                            <label htmlFor="user_pw" className="user_pw_title">
                                새 비밀번호
                            </label>
                            <Input
                                type="password"
                                id="user_pw"
                                value={newPw}
                                maxLength="16"
                                placeholder="새 비밀번호"
                                onChange={handleCheckNewPw}
                            />
                            <div className="noValid">
                                {!isNewPw && newPw.length > 0 && (
                                    <span>
                                        * 8~16자의 영문 대/소문자, 숫자,
                                        특수문자(!@#$%^&*?)만 입력해 주세요.
                                    </span>
                                )}
                            </div>
                        </div>
                        <div
                            className={
                                "user_pw_setting " +
                                (!isNewPwCheck && newPwCheck.length > 0
                                    ? "error"
                                    : "")
                            }
                        >
                            <label
                                htmlFor="user_pw_check"
                                className="user_pw_title"
                            >
                                새 비밀번호 확인
                            </label>
                            <Input
                                type="password"
                                id="user_pw_check"
                                value={newPwCheck}
                                maxLength="16"
                                placeholder="새 비밀번호 확인"
                                onChange={handleCheckNewPwCheck}
                            />
                            <div className="noValid">
                                {!isNewPwCheck && newPwCheck.length > 0 && (
                                    <span>* 비밀번호가 일치하지 않습니다.</span>
                                )}
                            </div>
                        </div>
                        <div className="buttons">
                            <Button inverted onClick={handleClosePw}>
                                취소
                            </Button>
                            <Button onClick={changeNewPw}>변경하기</Button>
                        </div>
                    </div>
                </UserSettingContainer>
            </SettingContainer>
        </SettingWrapper>
    );
}

export default SettingPage;
