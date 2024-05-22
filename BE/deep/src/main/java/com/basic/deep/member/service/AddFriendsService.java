package com.basic.deep.member.service;

import com.basic.deep.member.dto.*;

import java.util.List;

public interface AddFriendsService {
    // 친구 추가(following)
    FollowingResponseDTO followingOtherUsers(FollowingRequestDTO followingRequestDTO, Long memberNo);

    // 친구 삭제(unfollowing)
    UnFollowingResponseDTO unFollowingOtherUsers(UnFollowingRequestDTO unFollowingRequestDTO, Long memberNo);

    // 프로필 - 나 > 타인 -> 팔로잉 목록 보기
    List<AddFriendsListResponseDTO> addFriendsList(AddFriendsListRequestDTO addFriendsListRequestDTO);
}
