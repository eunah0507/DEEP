package com.basic.deep.member.repository;

import com.basic.deep.member.entity.SocialType;

import java.util.Optional;

public interface MemberRepositoryCustom {
    // MemberNo로 Token 값 가져오는 것
    // 소셜 로그인 시 사용함
    Optional<String> selectTokenByMemberNo(Long memberNo);

    // 소셜ID로 MemberNo를 가져오는 것
    Optional<Long> selectMemberBySocialId(SocialType registrationId, String socialId);

    // 회원가입 시 ID 중복 검사
    Optional<String> selectMemberID(String memberID);
}
