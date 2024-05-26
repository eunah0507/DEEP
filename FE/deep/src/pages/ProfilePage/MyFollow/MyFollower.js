import { useEffect, useState } from "react";
import { MyFollowerContainer, MyFollowerWrapper } from "./MyFollower.styles";
import { useSelector } from "react-redux";
import axiosInstance from "../../../apis/axiosInstance";
import userProfile from "../../../assets/images/deep-profile-blue.png";
import { useNavigate } from "react-router-dom";
import { IoCloseOutline } from "react-icons/io5";

function MyFollower(props) {
    const [followers, setFollowers] = useState([]);

    const navigate = useNavigate();

    const member = useSelector((state) => state.member.value);

    useEffect(() => {
        axiosInstance
            .post("/deep/member/my-follower", {
                memberNickName: member.memberNickName,
                memberRandom: member.memberRandom,
            })
            .then((response) => {
                console.log(response.data);
                setFollowers(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const handleClickProfile = (e, nickName, random) => {
        navigate(`/profile/${nickName}/${random.replace("#", "")}`);
    };

    const handleClose = () => {
        props.isOpenFollwer(false);
    };

    return (
        <MyFollowerWrapper>
            <MyFollowerContainer>
                <div className="follower_title">
                    <h4>팔로워</h4>
                    <span>{followers.length}</span>
                </div>
                <div className="close_follower" onClick={handleClose}>
                    <IoCloseOutline />
                </div>
                <ul className="followers_container">
                    {followers.map((follower) => {
                        return (
                            <li
                                className="follower"
                                onClick={(e) =>
                                    handleClickProfile(
                                        e,
                                        follower.memberNickName,
                                        follower.memberRandom
                                    )
                                }
                            >
                                <div className="user_profile">
                                    {follower.memberFile === null ? (
                                        <img
                                            src={userProfile}
                                            alt="user profile image"
                                        />
                                    ) : (
                                        <img
                                            src={follower.memberFile}
                                            alt="user profile image"
                                        />
                                    )}
                                    <div className="user_info_container">
                                        <div className="user_info">
                                            <span className="user_name">
                                                {follower.memberNickName}
                                            </span>
                                            <span className="user_random">
                                                {follower.memberRandom}
                                            </span>
                                        </div>
                                        <span className="user_introduce_container">
                                            {follower.memberIntroduce}
                                        </span>
                                    </div>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </MyFollowerContainer>
        </MyFollowerWrapper>
    );
}

export default MyFollower;
