package com.basic.deep.board.repository;

import com.basic.deep.board.entity.Board;

public interface ImgRepositoryCustom {

    // 게시글 수정 시 이미지 일괄 삭제 후 다시 삽입
    void deleteBoard(Board boardNo);
}
