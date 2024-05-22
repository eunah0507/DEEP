package com.basic.deep.board.repository;

import com.basic.deep.board.dto.BoardSearchResponseDTO;
import com.basic.deep.board.dto.BoardSearchTagResponseDTO;
import com.basic.deep.board.entity.Board;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

import static com.basic.deep.board.entity.QBoardTag.boardTag;
import static com.basic.deep.member.entity.QMember.member;
import static com.basic.deep.board.entity.QBoard.board;

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

    // 게시글 1개 상세 조회 > 태그가 뭐뭐 있는지 조회
    @Override
    public List<String> findAllBoardDetailTag(Board boardNo) {
        return queryFactory.select(boardTag.tagName)
                .from(boardTag)
                .where(boardTag.boardNo.eq(boardNo))
                .fetch();
    }

    // 태그 조회
    @Override
    public List<BoardSearchTagResponseDTO> selectTag(String tag, Long page) {
        return queryFactory.select(
                Projections.constructor(
                        BoardSearchTagResponseDTO.class,
                        board.boardNo,
                        board.boardCategory,
                        board.boardTitle,
                        member.memberNickname,
                        member.memberRandom,
                        board.boardDate
                ))
                .from(board)
                .join(boardTag)
                .on(board.boardNo.eq(boardTag.boardNo.boardNo).and(boardTag.tagName.eq(tag)))
                .join(member)
                .on(board.member_no.eq(member))
                .orderBy(board.boardNo.desc())
                .limit(10)
                .offset(page*10)
                .fetch();
    }


}
