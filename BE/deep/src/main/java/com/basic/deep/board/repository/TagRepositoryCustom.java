package com.basic.deep.board.repository;

import com.basic.deep.board.dto.BoardSearchResponseDTO;
import com.basic.deep.board.dto.BoardSearchTagRequestDTO;
import com.basic.deep.board.dto.BoardSearchTagResponseDTO;
import com.basic.deep.board.entity.Board;

import java.util.List;

public interface TagRepositoryCustom {

    // 게시글 수정 시 해시태그 일괄 삭제 후 다시 삽입
    void deleteBoard(Board boardNo);

    // 게시글 1개 조회 > 태그가 뭐 있는지 조회
    List<String> findAllBoardDetailTag(Board boardNo);

    // 태그별 조회
    List<BoardSearchTagResponseDTO> selectTag(String tag, Long page);
}
