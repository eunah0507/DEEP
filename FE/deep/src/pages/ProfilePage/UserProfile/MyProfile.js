import { MyProfileContainer, MyProfileWrapper } from "./MyProfile.styles";
import Button from "../../../components/Button/Button";
import { useEffect, useState } from "react";
import axiosInstance from "../../../apis/axiosInstance";
import userProfile from "../../../assets/images/deep-profile-blue.png";
import Likes from "../Likes/Likes";
import { useSelector } from "react-redux";
import UserPost from "../UserPosts/UserPost";
import UserComments from "../UserComments/UserComments";

function MyProfile() {
    const [nickName, setNickName] = useState("");
    const [random, setRandom] = useState("");
    const [introduce, setIntroduce] = useState("");
    const [profileImg, setProfileImg] = useState("");
    const [follower, setFollower] = useState("");
    const [following, setFollowing] = useState("");
    const [tab, setTab] = useState(0);

    const member = useSelector((state) => state.member.value);

    useEffect(() => {
        setNickName(member.memberNickName);
        setRandom(member.memberRandom);
        setIntroduce(member.memberIntroduce);
        setProfileImg(member.memberFile);

        axiosInstance
            .post("/deep/member/my-follower", {
                memberNickName: member.memberNickName,
                memberRandom: member.memberRandom,
            })
            .then((response) => {
                setFollower(response.data.length);
            })
            .catch((error) => console.log(error));

        axiosInstance
            .post("/deep/member/add-friends", {
                memberNickName: member.memberNickName,
                memberRandom: member.memberRandom,
            })
            .then((response) => {
                setFollowing(response.data.length);
            })
            .catch((error) => console.log(error));
    }, []);

    const handleClickLikes = () => {
        setTab(0);
    };

    const handleClickPosts = () => {
        setTab(1);
    };

    const handleClickComments = () => {
        setTab(2);
    };

    return (
        <MyProfileWrapper>
            <MyProfileContainer>
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
                            <span className="user_nickName">{nickName}</span>
                            <span className="user_number">{random}</span>
                        </div>
                        <div className="user_follow">
                            <div className="user_followers">
                                <span>{follower}</span>
                                <span>팔로워</span>
                            </div>
                            <div className="user_following">
                                <span>{following}</span>
                                <span>팔로잉</span>
                            </div>
                        </div>
                    </div>
                    <div className="user_introduce">
                        <span>{introduce}</span>
                    </div>
                    <Button largeWidth inverted to="/profile/edit">
                        프로필 편집
                    </Button>
                </div>
                <div className="user_contents_menu">
                    <ul className="user_contents_item">
                        <li
                            className={
                                "user_likes " + (tab === 0 ? "selected" : "")
                            }
                            onClick={handleClickLikes}
                        >
                            좋아요
                        </li>
                        <li
                            className={
                                "user_posts " + (tab === 1 ? "selected" : "")
                            }
                            onClick={handleClickPosts}
                        >
                            내가 쓴 글
                        </li>
                        <li
                            className={
                                "user_comments " + (tab === 2 ? "selected" : "")
                            }
                            onClick={handleClickComments}
                        >
                            내가 쓴 댓글
                        </li>
                    </ul>
                    <div className="user_contents_container">
                        {tab === 0 ? <Likes /> : <></>}
                        {tab === 1 ? <UserPost /> : <></>}
                        {tab === 2 ? <UserComments /> : <></>}
                    </div>
                </div>
            </MyProfileContainer>
        </MyProfileWrapper>
    );
}

export default MyProfile;
