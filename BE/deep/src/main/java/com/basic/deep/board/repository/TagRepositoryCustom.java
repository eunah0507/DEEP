package com.basic.deep.board.repository;

import com.basic.deep.board.entity.Board;

public interface TagRepositoryCustom {

    // 게시글 수정 시 해시태그 일괄 삭제 후 다시 삽입
    void deleteBoard(Board boardNo);
}
