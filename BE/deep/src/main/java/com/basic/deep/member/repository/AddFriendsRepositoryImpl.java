package com.basic.deep.member.repository;

import com.basic.deep.member.dto.AddFriendsListResponseDTO;
import com.basic.deep.member.entity.AddFriends;
import com.basic.deep.member.entity.Member;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

import static com.basic.deep.member.entity.QAddFriends.addFriends;
import static com.basic.deep.member.entity.QMember.member;

public class AddFriendsRepositoryImpl implements AddFriendsRepositoryCustom{

    @Autowired
    private JPAQueryFactory queryFactory;

    // 친구 삭제 (unfollowing)
    @Override
    public void deleteFriends(Member myMember, Member otherMember) {
        queryFactory.delete(addFriends)
                .where(addFriends.memberNo.eq(myMember).and(addFriends.addFriendNo.eq(otherMember)))
                .execute();
    }

    // 타인 > 나 : 나를 팔로우한 목록 보기
    @Override
    public List<AddFriendsListResponseDTO> selectAddFriendsList(Member memberList) {
       return queryFactory.select(
               Projections.constructor(AddFriendsListResponseDTO.class,
                       member.memberNickname, member.memberRandom, member.memberFile, member.memberIntroduce)
       )
               .from(member)
               .join(addFriends)
               .on(member.eq(addFriends.addFriendNo))
               .where(addFriends.memberNo.eq(memberList))
               .fetch();
    }
}
