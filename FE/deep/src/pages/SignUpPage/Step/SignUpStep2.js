import { Link } from "react-router-dom";
import { SignUpWrapper, SignUpContainer } from "./SignUpStep2.styles";
import deepLogo from "../../../assets/images/deep-logo-header.svg";
import Button from "../../../components/Button/Button";
import Input from "../../../components/Input/Input";

function SignUpStep2() {
    return (
        <SignUpWrapper>
            <SignUpContainer>
                <div className="logo">
                    <Link to="/">
                        <img src={deepLogo} alt="deep-logo" />
                    </Link>
                </div>
                <form id="signup_form">
                    <div className="form_item user_id">
                        <span className="input_title">아이디</span>
                        <div className="input_div">
                            <Input
                                type="text"
                                label="아이디"
                                placeholder="아이디"
                            />
                            <Button xSmallWidth>확인</Button>
                        </div>
                    </div>
                    <div className="form_item user_pw">
                        <span className="input_title">비밀번호</span>
                        <Input
                            type="password"
                            label="비밀번호"
                            placeholder="비밀번호"
                        />
                        <Input
                            type="password"
                            label="비밀번호 확인"
                            placeholder="비밀번호 확인"
                        />
                    </div>
                    <div className="form_item user_name">
                        <span className="input_title">이름</span>
                        <Input type="text" label="이름" placeholder="이름" />
                    </div>
                    <div className="form_item user_email">
                        <span className="input_title">이메일</span>
                        <Input
                            type="text"
                            label="이메일"
                            placeholder="이메일"
                        />
                    </div>
                    <div className="form_item user_address">
                        <span className="input_title">주소</span>
                        <div className="input_div">
                            <Input
                                type="text"
                                label="주소"
                                placeholder="주소"
                            />
                            <Button xSmallWidth>찾기</Button>
                        </div>
                        <Input
                            type="text"
                            label="상세주소"
                            placeholder="상세주소"
                        />
                    </div>
                    <div className="form_item user_phone">
                        <span className="input_title">휴대폰 번호</span>
                        <div className="input_div">
                            <Input
                                type="text"
                                label="휴대폰 번호"
                                placeholder="휴대폰 번호"
                            />
                            <Button xSmallWidth>인증</Button>
                        </div>
                        <div className="input_div">
                            <Input
                                type="text"
                                label="인증번호"
                                placeholder="인증번호"
                            />
                            <Button xSmallWidth>확인</Button>
                        </div>
                    </div>
                    <Button largeWidth largeFont>
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
