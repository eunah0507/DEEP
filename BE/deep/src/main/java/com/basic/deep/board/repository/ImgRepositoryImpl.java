package com.basic.deep.board.repository;

import com.basic.deep.board.entity.Board;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

import static com.basic.deep.board.entity.QBoardImg.boardImg;

public class ImgRepositoryImpl implements ImgRepositoryCustom{

    @Autowired
    private JPAQueryFactory queryFactory;

    // 게시글 수정 시 이미지 일괄 삭제 후 다시 삽입
    // 죽은 코드
    @Override
    public void deleteBoard(Board boardNo) {
        queryFactory.delete(boardImg)
                .where(boardImg.boardNo.eq(boardNo))
                .execute();
    }

    // 게시글 1개 상세 조회 - 이미지 조회
    // 죽은 코드
    @Override
    public List<String> findAllBoardDetailImg(Board boardNo) {
        return queryFactory.select(boardImg.imgFile)
                .from(boardImg)
                .where(boardImg.boardNo.eq(boardNo))
                .fetch();
    }
}
