package com.basic.deep.board.repository;

import com.basic.deep.board.entity.Board;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.beans.factory.annotation.Autowired;
import static com.basic.deep.board.entity.QBoardTag.boardTag;

public class TagRepositoryImpl implements TagRepositoryCustom {

    @Autowired
    private JPAQueryFactory queryFactory;

    // 게시글 수정 시 해시태그 일괄 삭제 후 다시 삽입
    @Override
    public void deleteBoard(Board boardNo) {
        queryFactory.delete(boardTag)
                .where(boardTag.boardNo.eq(boardNo))
                .execute();
    }
}
