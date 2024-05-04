package com.basic.deep.member.repository;

import com.basic.deep.member.dto.AddFriendsListResponseDTO;
import com.basic.deep.member.entity.Member;

import java.util.List;

public interface AddFriendsRepositoryCustom {

    // 친구 삭제 (unfollowing)
    void deleteFriends(Member myMember, Member otherMember);

    // 프로필 - 나 > 타인 : 팔로잉 목록 조회
    List<AddFriendsListResponseDTO> selectAddFriendsList(Member memberList);
}
