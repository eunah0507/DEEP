import { UserProfileContainer, UserProfileWrapper } from "./UserProfile.styles";
import { useEffect, useState } from "react";
import axiosInstance from "../../../apis/axiosInstance";
import userProfile from "../../../assets/images/deep-profile-blue.png";
import { useLocation } from "react-router-dom";
import userNothing from "../../../assets/images/deep-profile-nothing.png";
import UserPosts from "../UserPosts/UserPosts";
import UserComments from "../UserComments/UserComments";
import Button from "../../../components/Button/Button";

function UserProfile() {
    const [loading, setLoading] = useState(true);
    const [nickName, setNickName] = useState("");
    const [random, setRandom] = useState("");
    const [profileImg, setProfileImg] = useState(null);
    const [introduce, setIntroduce] = useState("");
    const [isUser, setIsUser] = useState(true);
    const [tab, setTab] = useState(true);

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
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setIsUser(false);
                setLoading(false);
            });
    }, []);

    const handleClickPosts = () => {
        setTab(true);
    };

    const handleClickComments = () => {
        setTab(false);
    };

    return (
        <>
            {loading ? (
                <UserProfileWrapper>
                    <UserProfileContainer></UserProfileContainer>
                </UserProfileWrapper>
            ) : (
                <UserProfileWrapper>
                    <UserProfileContainer>
                        {isUser ? (
                            <>
                                <div className="user_profile_info">
                                    <div className="user_profile_item">
                                        <div className="user_profile">
                                            {profileImg === null ? (
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
                                            <span className="user_nickName">
                                                {nickName}
                                            </span>
                                            <span className="user_number">
                                                {random}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="user_introduce">
                                        <span>{introduce}</span>
                                    </div>
                                    <Button largeWidth inverted>
                                        팔로우
                                    </Button>
                                </div>
                                <div className="user_contents_menu">
                                    <ul className="user_contents_item">
                                        <li
                                            className={
                                                "user_posts " +
                                                (tab ? "selected" : "")
                                            }
                                            onClick={handleClickPosts}
                                        >
                                            내가 쓴 글
                                        </li>
                                        <li
                                            className={
                                                "user_comments " +
                                                (tab ? "" : "selected")
                                            }
                                            onClick={handleClickComments}
                                        >
                                            내가 쓴 댓글
                                        </li>
                                    </ul>
                                    <div className="user_contents_container">
                                        {tab ? <UserPosts /> : <UserComments />}
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="nothing_profile_container">
                                <div className="nothing_profile">
                                    <img
                                        className="nothing_profile_image"
                                        src={userNothing}
                                        alt="profile nothing"
                                    />
                                </div>
                                <span>존재하지 않거나 탈퇴한 유저입니다.</span>
                            </div>
                        )}
                    </UserProfileContainer>
                </UserProfileWrapper>
            )}
        </>
    );
}

export default UserProfile;
