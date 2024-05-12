package com.basic.deep.board.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.beans.factory.annotation.Autowired;
import static com.basic.deep.board.entity.QBoardReply.boardReply;
public class ReplyRepositoryImpl implements ReplyRepositoryCustom{

    @Autowired
    private JPAQueryFactory queryFactory;

    // 댓글 삭제
    @Override
    public void deleteReply(Long replyNo) {
        queryFactory.delete(boardReply)
                .where(boardReply.ReplyNo.eq(replyNo))
                .execute();
    }
}
