package com.basic.deep.member.repository;

import com.basic.deep.member.entity.AddFriends;
import com.basic.deep.member.entity.Member;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.beans.factory.annotation.Autowired;
import static com.basic.deep.member.entity.QAddFriends.addFriends;

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
}
