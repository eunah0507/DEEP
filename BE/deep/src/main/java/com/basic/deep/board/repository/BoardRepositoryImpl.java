package com.basic.deep.board.repository;

import com.basic.deep.board.entity.Board;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.beans.factory.annotation.Autowired;

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

//    // 게시글 1개 상세 조회
//    @Override
//    public Optional<Board> boardDetail(Long boardNo) {
//        return Optional.empty();
//    }

    // 게시글 1개에 좋아요

}
