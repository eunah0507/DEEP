package com.basic.deep.board.repository;

import com.basic.deep.board.dto.ReplyDetailResponseDTO;
import com.basic.deep.board.entity.Board;
import com.basic.deep.board.entity.BoardReply;

import java.util.List;
import java.util.Optional;

public interface ReplyRepositoryCustom {

    // 댓글 삭제
    void deleteReply(Long replyNo);

    // 게시글 1개 상세 조회 > 댓글이 몇 개 있는지 조회
    Long selectReplyCount(Long boardNo);

    // 게시글 1개 상세 조회 > 댓글 전체 조회
    List<ReplyDetailResponseDTO> findAllReplyDetail(Board boardNo);
}
