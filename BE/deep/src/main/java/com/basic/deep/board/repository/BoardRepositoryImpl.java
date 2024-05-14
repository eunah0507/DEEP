package com.basic.deep.board.repository;

import com.basic.deep.board.dto.BoardCategoryListResponseDTO;
import com.basic.deep.board.dto.BoardSearchResponseDTO;
import com.basic.deep.board.entity.Board;
import com.basic.deep.board.entity.BoardLike;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Optional;

import static com.basic.deep.board.entity.QBoard.board;

public class BoardRepositoryImpl implements BoardRepositoryCustom{

    @Autowired
    private JPAQueryFactory queryFactory;

    // 게시글 삭제

    @Override
    public void deleteBoard(Long boardNo) {
        queryFactory.delete(board)
                .where(board.boardNo.eq(boardNo))
                .execute();
    }

    // 게시글 검색
    @Override
    public List<BoardSearchResponseDTO> selectBoardByTitleOrContent(String title, String cotnent) {
        return null;
    }


    // 1개 게시판 목록 전체 조회
    @Override
    public List<BoardCategoryListResponseDTO> selectBoardCategoryAll(Board boardNo) {
        return null;
    }


}
