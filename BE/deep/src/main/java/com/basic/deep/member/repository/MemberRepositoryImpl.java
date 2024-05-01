package com.basic.deep.member.repository;

import com.basic.deep.member.entity.Member;
import com.basic.deep.member.entity.SocialType;
import com.querydsl.core.Tuple;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Optional;

import static com.basic.deep.member.entity.QMember.member;

public class MemberRepositoryImpl implements MemberRepositoryCustom {

    @Autowired
    private JPAQueryFactory queryFactory;

    // Token 받아오기
    @Override
    public Optional<String> selectTokenByMemberNo(Long memberNo) {
        return Optional.ofNullable(
                queryFactory.select(member.memberToken)
                        .from(member)
                        .where(member.memberNo.eq(memberNo))
                        .where().fetchFirst());
    }

    // 소셜로그인시 kakao. google. naver. github중 무엇인지 파악한 뒤, 첫 로그인인지 판별
    @Override
    public Optional<Long> selectMemberBySocialId(SocialType registrationId, String socialId) {
        return Optional.ofNullable(
                queryFactory.select(member.memberNo)
                        .from(member)
                        .where(member.memberSocialID.eq(socialId).and(member.memberSocialType.eq(registrationId)))
                        .where().fetchFirst());
    }

    // 회원가입시 ID 중복검사
    @Override
    public Optional<String> selectMemberID(String memberID) {
        return Optional.ofNullable(
                queryFactory.select(member.memberID)
                        .from(member)
                        .where(member.memberID.eq(memberID))
                        .fetchFirst()
        );
    }

    // 일반 로그인
    @Override
    public Optional<Member> selectMemberIDandPW(String memberID) {
        return Optional.ofNullable(
                queryFactory.select(member)
                        .from(member)
                        .where(member.memberID.eq(memberID))
                        .fetchFirst()
        );
    }

    // ID 찾기
    @Override
    public List<Member> selectMemberByNameAndPhone(String memberName, String memberPhone) {
        return queryFactory.select(member)
                .from(member)
                .where(member.memberName.eq(memberName).and(member.memberPhone.eq(memberPhone)))
                .fetch();
    }

    // PW 찾기
    @Override
    public Optional<Member> selectMemberMail(String memberID, String memberName, String memberPhone) {
        return Optional.ofNullable(
                queryFactory.select(member)
                        .from(member)
                        .where(member.memberID.eq(memberID).and(member.memberName.eq(memberName).and(member.memberPhone.eq(memberPhone))))
                        .fetchFirst()
        );
    }

    // memberInfo 조회
    @Override
    public Optional<Member> selectMemberInfo(Long memberNo) {
        return Optional.ofNullable(
                queryFactory.select(member)
                        .from(member)
                        .where(member.memberNo.eq(memberNo))
                        .fetchFirst()
        );
    }


}
