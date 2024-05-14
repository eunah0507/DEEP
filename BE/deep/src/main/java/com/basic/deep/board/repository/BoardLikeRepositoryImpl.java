package com.basic.deep.board.repository;

import com.basic.deep.board.entity.BoardLike;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Optional;
import static com.basic.deep.board.entity.QBoardLike.boardLike;

public class BoardLikeRepositoryImpl implements BoardLikeRepositoryCustom {

    @Autowired
    private JPAQueryFactory queryFactory;


    // 게시글 좋아요 - 조회
    @Override
    public Optional<BoardLike> selectBoardLike(Long boardNo, Long memberNo) {
       return Optional.ofNullable(
               queryFactory.select(boardLike)
                .from(boardLike)
                .where(boardLike.boardNo.boardNo.eq(boardNo).and(boardLike.memberNo.memberNo.eq(memberNo)))
                .fetchFirst());
    }

    // 게시글 좋아요 - 삭제
    @Override
    public void deleteBoardLike(Long boardNo, Long memberNo) {
        queryFactory.delete(boardLike)
                .where(boardLike.boardNo.boardNo.eq(boardNo).and(boardLike.memberNo.memberNo.eq(memberNo)))
                .execute();
    }

    // 게시글 1개에 좋아요가 얼마나 있는지 조회
    @Override
    public Long selectBoardDetailLikeCount(Long boardNo) {
        return queryFactory.select(boardLike.count())
                .from(boardLike)
                .where(boardLike.boardNo.boardNo.eq(boardNo))
                .fetchFirst();
    }
}
