import Button from "../../../components/Button/Button";
import Input from "../../../components/Input/Input";
import { EditContainer, EditWrapper } from "./ProfileEdit.styles";
import userProfile from "../../../assets/images/deep-profile-blue.png";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../../../apis/axiosInstance";
import { saveMemberInfo } from "../../../store/memberStore";
import { FaCirclePlus } from "react-icons/fa6";

function ProfileEdit() {
    const [nickName, setNickName] = useState("");
    const [introduce, setIntroduce] = useState("");
    const [imgFile, setImgFile] = useState(null);
    const [imgFileSize, setImgFileSize] = useState(0);
    const [profileImg, setProfileImg] = useState("");
    const [isNickName, setIsNickName] = useState(false);
    const [isIntroduce, setIsIntroduce] = useState(false);
    const [isComplete, setIsComplete] = useState(false);

    const member = useSelector((state) => state.member.value);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        setProfileImg(member.memberFile);
        setNickName(member.memberNickName);
        setIntroduce(member.memberIntroduce);

        const regex = /^[a-zA-Z가-힣0-9?!^]{2,}$/;

        if (regex.test(member.memberNickName)) {
            setIsNickName(true);
        }
    }, []);

    const handleCheckNickName = (e) => {
        setNickName(e.target.value);

        const regex = /^[a-zA-Z가-힣0-9?!^]{2,}$/;

        if (regex.test(e.target.value)) {
            setIsNickName(true);
        } else {
            setIsNickName(false);
        }
    };

    const handleCheckIntroduce = (e) => {
        setIntroduce(e.target.value);

        const regex = /^[a-zA-Z가-힣0-9?!@$%^&*(){}[\]-_=+;:'"]$/;

        if (regex.test(e.target.value)) {
            setIsIntroduce(true);
        } else {
            setIsIntroduce(false);
        }
    };

    const formData = new FormData();

    const handleImgUpload = (e) => {
        const imageUrl = URL.createObjectURL(e.target.files[0]);
        console.log(e.target.files[0]);
        console.log(typeof e.target.files[0]);
        setProfileImg(imageUrl);
        setImgFile(e.target.files[0]);
        setImgFileSize(e.target.files[0].size);
    };

    const handleCancel = () => {
        alert("변경사항이 저장되지 않을 수 있습니다.");
        navigate(-1);
    };

    const profileEdit = () => {
        const limitsize = 1024 ** 2 * 10;

        setIsComplete(true);

        if (nickName.length === 0) {
            alert("닉네임은 필수 입력값입니다.");
            setIsComplete(false);
        } else if (imgFileSize > limitsize) {
            alert("이미지의 최대 크기는 10MB 이하입니다.");
            setIsComplete(false);
        } else {
            if (imgFile === null) {
                formData.append("memberNickName", nickName);
                formData.append("memberIntroduce", introduce);
            } else {
                formData.append("memberFile", imgFile);
                formData.append("memberNickName", nickName);
                formData.append("memberIntroduce", introduce);
            }

            axiosInstance
                .put("/deep/member/modify", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((response) => {
                    const payload = {
                        memberFile: profileImg,
                        memberNickName: nickName,
                        memberIntroduce: introduce,
                    };

                    dispatch(saveMemberInfo(payload));
                    alert("프로필 편집이 완료되었습니다.");

                    const random = member.memberRandom.replace("#", "");
                    navigate(`/profile/${random}`);
                })
                .catch((error) => {
                    console.log(error);
                    alert("프로필 편집에 실패하였습니다.\n다시 시도해 주세요.");
                    setIsComplete(false);
                });
        }
    };

    return (
        <EditWrapper>
            <EditContainer>
                <div className="user_profile_edit">
                    <div className="user_img_container">
                        <label
                            htmlFor="user_profile_img"
                            className="user_profile_img"
                        >
                            <div className="user_img">
                                {profileImg === "" ? (
                                    <img
                                        src={userProfile}
                                        alt="user-profile-image"
                                    />
                                ) : (
                                    <img
                                        src={profileImg}
                                        alt="user-profile-image"
                                    />
                                )}
                            </div>
                            <div className="img_upload_icon">
                                <FaCirclePlus />
                            </div>
                        </label>
                    </div>
                    <input
                        type="file"
                        id="user_profile_img"
                        className="user_profile_upload"
                        onChange={handleImgUpload}
                    />
                    <div
                        className={
                            "user_nickname_edit " + (!isNickName ? "error" : "")
                        }
                    >
                        <div className="user_edit">
                            <label htmlFor="nickname">
                                닉네임 <span>(필수)</span>
                            </label>
                            <span className="text_length">
                                {nickName.length}/20
                            </span>
                        </div>
                        <Input
                            type="text"
                            id="nickname"
                            value={nickName}
                            placeholder="닉네임을 입력해 주세요."
                            maxlength="20"
                            onChange={handleCheckNickName}
                        />
                        <div className="noValid">
                            {!isNickName | (nickName.length === 0) && (
                                <span>
                                    * 2~20자의 한글, 영어, 숫자, 특수문자(?, !,
                                    ^)만 사용 가능합니다.
                                </span>
                            )}
                        </div>
                    </div>
                    <div className="user_introduce_edit">
                        <div className="user_edit">
                            <label htmlFor="introduce">자기소개</label>
                            <span className="text_length">
                                {introduce.length}/200
                            </span>
                        </div>
                        <textarea
                            name="message"
                            value={introduce}
                            placeholder="자기소개를 해 주세요."
                            maxLength="200"
                            onChange={handleCheckIntroduce}
                        ></textarea>
                    </div>
                    <div className="buttons">
                        <Button
                            smallWidth
                            inverted
                            largeFont
                            onClick={handleCancel}
                        >
                            취소
                        </Button>
                        <Button
                            smallWidth
                            largeFont
                            disabled={isComplete}
                            onClick={profileEdit}
                        >
                            완료
                        </Button>
                    </div>
                </div>
            </EditContainer>
        </EditWrapper>
    );
}

export default ProfileEdit;
