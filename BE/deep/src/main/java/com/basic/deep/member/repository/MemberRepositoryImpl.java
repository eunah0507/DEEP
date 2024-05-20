package com.basic.deep.member.repository;

import com.basic.deep.member.dto.MemberProfieLikeResponseDTO;
import com.basic.deep.member.dto.MemberProfilePostResponseDTO;
import com.basic.deep.member.dto.MemberProfileReplyResponseDTO;
import com.basic.deep.member.dto.MemberSearchResponseDTO;
import com.basic.deep.member.entity.Member;
import com.basic.deep.member.entity.SocialType;
import com.querydsl.core.Tuple;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Optional;

import static com.basic.deep.member.entity.QMember.member;
import static com.basic.deep.board.entity.QBoard.board;
import static com.basic.deep.board.entity.QBoardReply.boardReply;
import static com.basic.deep.board.entity.QBoardLike.boardLike;

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

    // 회원 탈퇴
    @Override
    public void deleteMember(Long memberNo) {
        queryFactory.delete(member)
                .where(member.memberNo.eq(memberNo))
                .execute();

    }

    // Refresh Token과 ID가 같은지 확인
    @Override
    public Optional<Long> memberRefreshTokenAndID(String memberID, String memberToken) {
        return Optional.ofNullable(
                queryFactory.select(member.memberNo)
                        .from(member)
                        .where(member.memberID.eq(memberID).and(member.memberToken.eq(memberToken)))
                        .fetchFirst()
        );
    }

    // 닉네임과 랜덤번호로 나머지 정보 다 뽑아오기
    @Override
    public Optional<Member> selectMemberNickAndRandom(String memberNickName, String memberRandom) {
        return Optional.ofNullable(
                queryFactory.select(member)
                        .from(member)
                        .where(member.memberNickname.eq(memberNickName).and(member.memberRandom.eq(memberRandom)))
                        .fetchFirst()
        );
    }

    // 유저 검색
    @Override
    public List<MemberSearchResponseDTO> selectMemberByNickNameAndRandom(String nickname, String random) {
        return queryFactory.select(
                Projections.constructor(MemberSearchResponseDTO.class,
                        member.memberNickname,member.memberRandom,member.memberFile,member.memberIntroduce)
        )
                .from(member)
                .where(member.memberNickname.like("%" + nickname + "%").or(member.memberRandom.in(random)))
                .fetch();
    }

    // 다른 유저의 프로필 보기
    @Override
    public Optional<Member> selectOtherMemberNickNameAndRandom(String memberNickName, String memberRandom) {
        return Optional.ofNullable(
                queryFactory.select(member)
                        .from(member)
                        .where(member.memberNickname.eq(memberNickName).and(member.memberRandom.eq(memberRandom)))
                        .fetchFirst()
        );
    }

    // [커뮤니티 프로필] 마이 페이지 - 내가 쓴 글 확인
    @Override
    public List<MemberProfilePostResponseDTO> selectMemberPost(Long memberNo) {
        return queryFactory.select(
                Projections.constructor(MemberProfilePostResponseDTO.class,
                        board.boardNo, board.boardCategory ,board.boardTitle,
                        board.boardDate, board.boardReadCount)
                )
                .from(member)
                .join(board)
                .on(member.memberNo.eq(board.member_no.memberNo))
                .where(member.memberNo.eq(memberNo))
                .fetch();
    }

    // [커뮤니티 프로필] 마이 페이지 - 내가 쓴 댓글 확인
    @Override
    public List<MemberProfileReplyResponseDTO> selectMemberReply(String memberNickName, String memberRandom) {
        return queryFactory.select(Projections.constructor(MemberProfileReplyResponseDTO.class,
                        board.boardNo, board.boardCategory ,board.boardTitle,
                        boardReply.replyContent, board.boardDate))
                .from(board)
                .join(boardReply)
                .on(board.eq(boardReply.boardNo))
                .where(boardReply.replyNickName.eq(memberNickName).and(boardReply.replyRandom.eq(memberRandom)))
                .fetch();
    }

    // [커뮤니티 프로필] 마이 페이지 - 내가 누른 좋아요 확인
    @Override
    public List<MemberProfieLikeResponseDTO> selectMemberLike(Long memberNo) {
        return queryFactory.select(Projections.constructor(MemberProfieLikeResponseDTO.class,
                        board.boardNo, board.boardCategory ,board.boardTitle,
                        board.member_no.memberNickname, board.member_no.memberRandom,
                        board.boardDate, board.boardReadCount))
                .from(boardLike)
                .join(board)
                .on(board.eq(boardLike.boardNo))
                .where(boardLike.memberNo.memberNo.eq(memberNo))
                .fetch();
    }

}
