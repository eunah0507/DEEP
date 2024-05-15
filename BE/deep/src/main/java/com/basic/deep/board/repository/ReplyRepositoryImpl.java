package com.basic.deep.board.repository;

import com.basic.deep.board.dto.ReplyDetailResponseDTO;
import com.basic.deep.board.entity.Board;
import com.basic.deep.board.entity.BoardReply;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

import static com.basic.deep.board.entity.QBoardReply.boardReply;
import static com.basic.deep.board.entity.QBoard.board;
import static com.basic.deep.member.entity.QMember.member;
public class ReplyRepositoryImpl implements ReplyRepositoryCustom{

    @Autowired
    private JPAQueryFactory queryFactory;

    // 댓글 삭제
    @Override
    public void deleteReply(Long replyNo) {
        queryFactory.delete(boardReply)
                .where(boardReply.ReplyNo.eq(replyNo))
                .execute();
    }

    // 게시글 1개 상세 조회 > 댓글이 몇 개 달렸는지 조회
    @Override
    public Long selectReplyCount(Long boardNo) {
        return queryFactory.select(boardReply.count())
                .from(boardReply)
                .where(boardReply.boardNo.boardNo.eq(boardNo))
                .fetchFirst();
    }

    // 게시글 1개 상세 조회 > 댓글 전체 조회
    @Override
    public List<ReplyDetailResponseDTO> findAllReplyDetail(Board boardNo) {
        return queryFactory.select(Projections.constructor(
                ReplyDetailResponseDTO.class, boardReply.ReplyNo, boardReply.replyNickName,
                        boardReply.replyRandom, member.memberFile,
                        boardReply.replyContent, boardReply.replyDate))
                .from(boardReply)
                .join(member)
                .on(boardReply.boardNo.member_no.eq(member))
                .where(boardReply.boardNo.boardNo.eq(boardNo.getBoardNo()))
                .fetch();
    }
}
