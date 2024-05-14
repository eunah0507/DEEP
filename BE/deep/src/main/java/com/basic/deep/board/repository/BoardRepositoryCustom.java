package com.basic.deep.board.repository;

import com.basic.deep.board.dto.BoardCategoryListResponseDTO;
import com.basic.deep.board.dto.BoardSearchResponseDTO;
import com.basic.deep.board.entity.Board;
import com.basic.deep.board.entity.BoardLike;

import java.util.List;
import java.util.Optional;

public interface BoardRepositoryCustom {

    // 게시글 삭제
    void deleteBoard(Long boardNo);

    // 게시글 검색
    List<BoardSearchResponseDTO> selectBoardByTitleOrContent(String title, String cotnent);

    // 1개 게시판 전체 조회
    List<BoardCategoryListResponseDTO> selectBoardCategoryAll(Board boardNo);





}
