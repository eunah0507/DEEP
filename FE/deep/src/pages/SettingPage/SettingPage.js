import { useEffect, useState } from "react";
import { SettingContainer, SettingWrapper } from "./SettingPage.styles";
import { SlArrowRight } from "react-icons/sl";
import axiosInstance from "../../apis/axiosInstance";
import { getCookie } from "../../apis/cookie";

function SettingPage() {
    const [name, setName] = useState("");
    const [id, setId] = useState("");
    const [date, setDate] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [accessToken, setAccessToken] = useState("");

    useEffect(() => {
        axiosInstance
            .get("/deep/member/info", {
                headers: {
                    Authorization: `${getCookie("Authorization")}`,
                },
            })
            .then((response) => {
                const data = response.data;

                const date = new Date(data.memberCreated);
                date.setHours(date.getHours() + 9);
                const year = date.getFullYear();
                const month = ("0" + (date.getMonth() + 1)).slice(-2);
                const day = ("0" + date.getDate()).slice(-2);
                const signUpDate = `${year}.${month}.${day}`;

                setName(data.memberName);
                setId(data.memberID);
                setDate(signUpDate);
                setEmail(data.memberMail);
                setPhone(data.memberPhone);
            })
            .catch((error) => console.log(error));
    }, []);

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
                <div className="user_info_item">
                    <h3 className="setting_title">계정</h3>
                    <ul>
                        <li className="user_info">
                            <span>이메일 변경</span>
                            <span>
                                {email}
                                <SlArrowRight />
                            </span>
                        </li>
                        <li className="user_info">
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
            </SettingContainer>
        </SettingWrapper>
    );
}

export default SettingPage;
