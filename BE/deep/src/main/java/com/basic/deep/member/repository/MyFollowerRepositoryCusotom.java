package com.basic.deep.member.repository;

import com.basic.deep.member.entity.Member;

public interface MyFollowerRepositoryCusotom {

    // 친구 삭제 (unfollowing)
    void deleteFriends(Member myMember, Member otherMember);
}
