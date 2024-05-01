package com.basic.deep.member.repository;

import com.basic.deep.member.entity.Member;
import com.basic.deep.member.entity.SocialType;
import com.querydsl.core.Tuple;

import java.util.List;
import java.util.Optional;

public interface MemberRepositoryCustom {
    // MemberNo로 Token 값 가져오는 것
    // 소셜 로그인 시 사용함
    Optional<String> selectTokenByMemberNo(Long memberNo);

    // 소셜ID로 MemberNo를 가져오는 것
    Optional<Long> selectMemberBySocialId(SocialType registrationId, String socialId);

    // 회원가입 시 ID 중복 검사
    Optional<String> selectMemberID(String memberID);

    // 일반 로그인
    Optional<Member> selectMemberIDandPW(String memberID);

    // ID 찾기
    List<Member> selectMemberByNameAndPhone(String memberName, String memberPhone);

    // PW 찾기
    Optional<Member> selectMemberMail(String memberID, String memberName, String memberPhone);

    // memberInfo 조회
    Optional<Member> selectMemberInfo(Long memberNo);

}
