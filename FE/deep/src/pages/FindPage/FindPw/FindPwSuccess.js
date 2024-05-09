import Button from "../../../components/Button/Button";
import { FindPwContainer } from "./FindPwSuccess.styles";

function FindPwSuccess(props) {
    const email = props.userEmail;

    return (
        <FindPwContainer>
            <div className="title">
                <span>
                    임시 비밀번호를 회원님의 이메일({email})로 발송하였습니다.
                </span>
                <span>
                    로그인 후 설정 페이지에서 반드시 비밀번호를 변경해 주세요.
                </span>
            </div>
            <div className="button">
                <Button smallWidth to="/login">
                    로그인하기
                </Button>
            </div>
        </FindPwContainer>
    );
}

export default FindPwSuccess;
