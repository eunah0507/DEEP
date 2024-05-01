package com.basic.deep.member.repository;

import com.basic.deep.member.entity.Member;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.beans.factory.annotation.Autowired;

import static com.basic.deep.member.entity.QMyFollower.myFollower;

public class MyFollowerRepositoryImpl implements MyFollowerRepositoryCusotom {

    @Autowired
    private JPAQueryFactory queryFactory;

    // 친구 삭제(unfollowing)
    @Override
    public void deleteFriends(Member myMember, Member otherMember) {
        queryFactory.delete(myFollower)
                .where(myFollower.myFollowerNo.eq(myMember).and(myFollower.memberNo.eq(otherMember)))
                .execute();
    }
}
