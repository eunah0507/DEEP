package com.basic.deep.member.repository;

import com.basic.deep.member.dto.MemberProfieLikeResponseDTO;
import com.basic.deep.member.dto.MemberProfilePostResponseDTO;
import com.basic.deep.member.dto.MemberProfileReplyResponseDTO;
import com.basic.deep.member.dto.MemberSearchResponseDTO;
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

    // 회원 탈퇴
    void deleteMember(Long memberNo);

    // Refresh Token과 ID가 같은지 확인
    Optional<Long> memberRefreshTokenAndID(String memberID, String memberToken);

    // memberNickName과 memberRandom으로 나머지 member 정보 뽑아오기
    Optional<Member> selectMemberNickAndRandom(String memberNickName, String memberRandom);

    // 멤버 검색
    List<MemberSearchResponseDTO> selectMemberByNickNameAndRandom(String nickname, String random);

    // 다른 유저의 프로필 보기
    Optional<Member> selectOtherMemberNickNameAndRandom(String memberNickName, String memberRandom);

    // [커뮤니티 프로필] 마이 페이지 - 내가 쓴 글 확인
    List<MemberProfilePostResponseDTO> selectMemberPost(Long memberNo);

    // [커뮤니티 프로필] 마이 페이지 - 내가 쓴 댓글 확인
    List<MemberProfileReplyResponseDTO> selectMemberReply(String memberNickName, String memberRandom);

    // [커뮤니티 프로필] 마이 페이지 - 내가 누른 좋아요 확인
    List<MemberProfieLikeResponseDTO> selectMemberLike(Long memberNo);

}
