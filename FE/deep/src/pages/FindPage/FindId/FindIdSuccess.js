import Button from "../../../components/Button/Button";
import { FindIdContainer } from "./FindIdSuccess.styles";

function FindIdSuccess(props) {
    return (
        <FindIdContainer>
            <div className="title">회원님의 정보와 일치하는 아이디입니다.</div>
            <div className="find_id">
                <ul>
                    {props.findId.map((ids) => {
                        return (
                            <li className="user_id">
                                <p>
                                    <span>아이디</span>
                                    {ids[0]}
                                </p>
                                <p>
                                    <span>가입일자</span>
                                    {ids[1]}
                                </p>
                            </li>
                        );
                    })}
                </ul>
            </div>
            <div className="buttons">
                <Button smallWidth to="/login">
                    로그인하기
                </Button>
                <Button inverted smallWidth to="/find-password">
                    비밀번호 찾기
                </Button>
            </div>
        </FindIdContainer>
    );
}

export default FindIdSuccess;
