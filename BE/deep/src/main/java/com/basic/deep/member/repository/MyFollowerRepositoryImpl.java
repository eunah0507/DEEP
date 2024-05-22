package com.basic.deep.member.repository;

import com.basic.deep.member.dto.MyFollowerListResponseDTO;
import com.basic.deep.member.entity.Member;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

import static com.basic.deep.member.entity.QMyFollower.myFollower;
import static com.basic.deep.member.entity.QMember.member;

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

    // 타인 > 나 : 나를 팔로우한 목록 보기
    @Override
    public List<MyFollowerListResponseDTO> selectMyFollowerList(Member memberList) {
        return queryFactory.select(
                        Projections.constructor(MyFollowerListResponseDTO.class,
                                member.memberNickname, member.memberRandom, member.memberFile, member.memberIntroduce)
                )
                .from(member)
                .join(myFollower)
                .on(member.eq(myFollower.myFollowerNo))
                .where(myFollower.memberNo.eq(memberList))
                .fetch();
    }
}
