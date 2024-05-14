package com.basic.deep.board.repository;

import com.basic.deep.board.entity.BoardLike;

import java.util.Optional;

public interface BoardLikeRepositoryCustom {

    // 게시글 좋아요 - 조회 + 게시글 1개 상세 조회 - 내가 좋아요 눌렀는지 여부
    Optional<BoardLike> selectBoardLike(Long boardNo, Long memberNo);

    // 게시글 좋아요 - 삭제
    void deleteBoardLike(Long boardNo, Long memberNo);

    // 1개의 게시글에 좋아요가 몇 개 있는지 조회
    Long selectBoardDetailLikeCount(Long boardNo);


}
