package com.basic.deep.member.service;

import com.basic.deep.member.dto.FollowingRequestDTO;
import com.basic.deep.member.dto.FollowingResponseDTO;
import com.basic.deep.member.dto.UnFollowingRequestDTO;
import com.basic.deep.member.dto.UnFollowingResponseDTO;

public interface MyFollowerService {
    // 친구 추가(following)
    FollowingResponseDTO followingOtherUsers(FollowingRequestDTO followingRequestDTO, Long memberNo);

    // 친구 삭제(unfollowing)
    UnFollowingResponseDTO unfollowingOtherUsers(UnFollowingRequestDTO unFollowingRequestDTO, Long memberNo);
}
