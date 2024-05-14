import { ProfileContainer, ProfileWrapper } from "./ProfilePage.styles";
import userProfile from "../../assets/images/deep-profile-blue.png";
import Button from "../../components/Button/Button";
import { useEffect, useState } from "react";
import axiosInstance from "../../apis/axiosInstance";
import Likes from "./Likes";
import { useCookies } from "react-cookie";

function MyProfile() {
    const [nickName, setNickName] = useState("");
    const [random, setRandom] = useState("");
    const [introduce, setIntroduce] = useState("");
    const [follower, setFollower] = useState("");
    const [following, setFollowing] = useState("");
    const [cookies, setCookie] = useCookies([]);

    useEffect(() => {
        axiosInstance
            .get("/deep/member/info", {
                headers: {
                    Authorization: `${cookies.Access}`,
                },
            })
            .then((response) => {
                const data = response.data;

                setNickName(data.memberNickName);
                setRandom(data.memberRandom);
                setIntroduce(data.memberIntroduce);
            })
            .catch((error) => console.log(error));

        axiosInstance
            .post(
                "/deep/member/my-follower",
                {
                    memberNickName: nickName,
                    memberRandom: random,
                },
                {
                    headers: {
                        Authorization: `${cookies.Access}`,
                    },
                }
            )
            .then((response) => {
                const data = response.data;

                setFollower(data.length);
            })
            .catch((error) => console.log(error));

        axiosInstance
            .post(
                "/deep/member/add-friends",
                {
                    memberNickName: nickName,
                    memberRandom: random,
                },
                {
                    headers: {
                        Authorization: `${cookies.Access}`,
                    },
                }
            )
            .then((response) => {
                const data = response.data;

                setFollowing(data.length);
            })
            .catch((error) => console.log(error));
    }, []);

    return (
        <ProfileWrapper>
            <ProfileContainer>
                <div className="user_profile_info">
                    <div className="user_profile_item">
                        <div className="user_profile">
                            <img src={userProfile} alt="user-profile-image" />
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
                    <Button largeWidth inverted>
                        프로필 편집
                    </Button>
                </div>
                <div className="user_contents">
                    <ul>
                        <li className="selected">좋아요</li>
                        <li>내가 쓴 글</li>
                        <li>내가 쓴 댓글</li>
                    </ul>
                    <Likes />
                </div>
            </ProfileContainer>
        </ProfileWrapper>
    );
}

export default MyProfile;
