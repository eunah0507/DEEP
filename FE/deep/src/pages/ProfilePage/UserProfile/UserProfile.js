import { UserProfileContainer, UserProfileWrapper } from "./UserProfile.styles";
import { useEffect, useState } from "react";
import axiosInstance from "../../../apis/axiosInstance";
import userProfile from "../../../assets/images/deep-profile-blue.png";
import { useLocation } from "react-router-dom";
import userNothing from "../../../assets/images/deep-profile-nothing.png";

function UserProfile() {
    const [nickName, setNickName] = useState("");
    const [random, setRandom] = useState("");
    const [profileImg, setProfileImg] = useState(null);
    const [introduce, setIntroduce] = useState("");
    const [isUser, setIsUser] = useState(true);

    const location = useLocation();

    const userNickName = decodeURIComponent(location.pathname.split("/")[2]);
    const userRandom = location.pathname.split("/")[3];

    useEffect(() => {
        axiosInstance
            .post("/deep/member/others", {
                memberNickName: userNickName,
                memberRandom: `#${userRandom}`,
            })
            .then((response) => {
                const data = response.data;

                setNickName(data.memberNickName);
                setRandom(data.memberRandom);
                setProfileImg(data.memberFile);
                setIntroduce(data.memberIntroduce);
                setIsUser(true);
            })
            .catch((error) => {
                console.log(error);
                setIsUser(false);
            });
    }, []);

    return (
        <UserProfileWrapper>
            <UserProfileContainer>
                {isUser ? (
                    <div className="user_profile_info">
                        <div className="user_profile_item">
                            <div className="user_profile">
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
                                {/* <img src="https://developersitedeep.s3.ap-northeast-2.amazonaws.com/deepProfile/5baba5e2-9d0d-49b3-9c58-b3315e7ae3a4.jpg" alt="user-profile-image" /> */}
                                <span className="user_nickName">
                                    {nickName}
                                </span>
                                <span className="user_number">{random}</span>
                            </div>
                        </div>
                        <div className="user_introduce">
                            <span>{introduce}</span>
                        </div>
                    </div>
                ) : (
                    <div className="nothing_profile_container">
                        <div className="nothing_profile">
                            <img
                                className="nothing_profile_image"
                                src={userNothing}
                                alt="profile nothing"
                            />
                        </div>
                        <span>존재하지 않거나 탈퇴한 회원입니다.</span>
                    </div>
                )}
            </UserProfileContainer>
        </UserProfileWrapper>
    );
}

export default UserProfile;
