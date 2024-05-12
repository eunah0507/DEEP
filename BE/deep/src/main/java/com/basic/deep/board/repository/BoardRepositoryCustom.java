package com.basic.deep.board.repository;

import com.basic.deep.board.entity.Board;

import java.util.Optional;

public interface BoardRepositoryCustom {

    // 게시글 삭제
    void deleteBoard(Long boardNo);

    // 게시글 1개 상세 조회
//    Optional<Board> boardDetail(Long boardNo);

}
