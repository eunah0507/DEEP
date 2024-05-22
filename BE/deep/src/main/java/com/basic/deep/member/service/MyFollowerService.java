package com.basic.deep.member.service;

import com.basic.deep.member.dto.*;

import java.util.List;

public interface MyFollowerService {
    // 친구 추가(following)
    FollowingResponseDTO followingOtherUsers(FollowingRequestDTO followingRequestDTO, Long memberNo);

    // 친구 삭제(unfollowing)
    UnFollowingResponseDTO unfollowingOtherUsers(UnFollowingRequestDTO unFollowingRequestDTO, Long memberNo);

    // 프로필 - 타인 > 나 -> 팔로워 목록 보기
    List<MyFollowerListResponseDTO> myFollowerList(MyFollowerListRequestDTO myFollowerListRequestDTO);
}
