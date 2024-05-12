package com.basic.deep.board.repository;

import com.basic.deep.board.entity.Board;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.beans.factory.annotation.Autowired;
import static com.basic.deep.board.entity.QBoardImg.boardImg;

public class ImgRepositoryImpl implements ImgRepositoryCustom{

    @Autowired
    private JPAQueryFactory queryFactory;

    // 게시글 수정 시 이미지 일괄 삭제 후 다시 삽입
    @Override
    public void deleteBoard(Board boardNo) {
        queryFactory.delete(boardImg)
                .where(boardImg.boardNo.eq(boardNo))
                .execute();
    }
}
