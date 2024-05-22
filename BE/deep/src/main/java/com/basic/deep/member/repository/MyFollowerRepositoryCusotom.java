package com.basic.deep.member.repository;

import com.basic.deep.member.dto.MyFollowerListResponseDTO;
import com.basic.deep.member.entity.Member;
import com.basic.deep.member.entity.MyFollower;

import java.util.List;

public interface MyFollowerRepositoryCusotom {

    // 친구 삭제 (unfollowing)
    void deleteFriends(Member myMember, Member otherMember);

    // 타인 > 나 : 나를 팔로우한 목록들 보기
    List<MyFollowerListResponseDTO> selectMyFollowerList(Member memberList);
}
