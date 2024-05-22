package com.basic.deep.board.repository;

import com.basic.deep.board.dto.BoardBestResponseDTO;
import com.basic.deep.board.dto.BoardCategoryListResponseDTO;
import com.basic.deep.board.dto.BoardMainIndexResponseDTO;
import com.basic.deep.board.dto.BoardSearchResponseDTO;
import com.basic.deep.board.entity.Board;
import com.basic.deep.board.entity.BoardLike;
import com.basic.deep.board.entity.Category;

import java.util.List;
import java.util.Optional;

public interface BoardRepositoryCustom {

    // 게시글 삭제
    void deleteBoard(Long boardNo);

    // 게시글 검색
    List<BoardSearchResponseDTO> selectBoardByTitleOrContent(String keyword);

    // 1개 게시판 전체 조회
    List<BoardCategoryListResponseDTO> findAllBoardCategory(Category category, Long page);

//    // 메인 페이지용 게시판 조회
//    List<BoardMainIndexResponseDTO> findAllBoardMain(Board boardNo);

    // 인기글 게시판 목록 조회
    List<BoardBestResponseDTO> findAllBoardLike(Long page);

    // 해당 게시판에 게시글이 몇 페이지까지 있는지
    Long selectBoardPostMaxPage (Category category);

    // 해당 게시글에 댓글이 몇 페이지까지 있는지
    Long selectBoardReplyMaxPage(Long boardNo);






}
