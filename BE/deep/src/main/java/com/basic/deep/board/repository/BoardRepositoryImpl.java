package com.basic.deep.board.repository;

import com.basic.deep.board.dto.BoardBestResponseDTO;
import com.basic.deep.board.dto.BoardCategoryListResponseDTO;
import com.basic.deep.board.dto.BoardMainIndexResponseDTO;
import com.basic.deep.board.dto.BoardSearchResponseDTO;
import com.basic.deep.board.entity.Board;
import com.basic.deep.board.entity.BoardLike;
import com.basic.deep.board.entity.Category;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Optional;

import static com.basic.deep.board.entity.QBoard.board;
import static com.basic.deep.member.entity.QMember.member;
import static com.basic.deep.board.entity.QBoardLike.boardLike;
import static com.basic.deep.board.entity.QBoardReply.boardReply;
import static com.basic.deep.board.entity.QBoardImg.boardImg;
import static com.basic.deep.board.entity.QBoardTag.boardTag;

public class BoardRepositoryImpl implements BoardRepositoryCustom{

    @Autowired
    private JPAQueryFactory queryFactory;

    // 게시글 삭제 : 1. 게시글에 달린 좋아요 삭제
    @Override
    public void deleteBoard(Long boardNo) {
        // 게시글 삭제 : 1. 게시글에 달린 좋아요 삭제
        queryFactory.delete(boardLike)
                .where(boardLike.boardNo.boardNo.eq(boardNo))
                .execute();

        // 게시글 삭제 : 2. 게시글에 달린 이미지들 삭제
        queryFactory.delete(boardImg)
                .where(boardImg.boardNo.boardNo.eq(boardNo))
                .execute();

        // 게시글 삭제 : 3. 게시글에 달린 댓글들 삭제
        queryFactory.delete(boardReply)
                .where(boardReply.boardNo.boardNo.eq(boardNo))
                .execute();

        // 게시글 삭제 : 4. 게시글에 달린 태그 삭제
        queryFactory.delete(boardTag)
                .where(boardTag.boardNo.boardNo.eq(boardNo))
                .execute();

        // 게시글 삭제 : 5. 게시글 삭제
        queryFactory.delete(board)
                .where(board.boardNo.eq(boardNo))
                .execute();
    }

    // 1개 게시판 목록 전체 조회
    @Override
    public List<BoardCategoryListResponseDTO> findAllBoardCategory(Category category, Long page) {
        return queryFactory.select(Projections.constructor(
                BoardCategoryListResponseDTO.class, board.boardNo,
                board.boardTitle, board.boardContent,
                board.member_no.memberNickname, board.member_no.memberRandom,
                board.member_no.memberFile, board.boardDate, board.boardReadCount))
                .from(board)
                .where(board.boardCategory.eq(category))
                .orderBy(board.boardNo.desc())
                .limit(10)
                .offset(page*10)
                .fetch();
    }

//    // 메인 페이지용 게시판 조회
//    @Override
//    public List<BoardMainIndexResponseDTO> findAllBoardMain(Board boardNo) {
//        return queryFactory.select(Projections.constructor(
//                board.boardNo, board.boardCategory,
//                board.boardTitle, member.memberNickname,
//                member.memberRandom, board.boardDate
//                ))
//                .from(board)
//                .where()
//                .fetch();
//    }

    // 인기글 게시판 목록 조회
    @Override
    public List<BoardBestResponseDTO> findAllBoardLike(Long page) {

        return queryFactory.select(Projections.constructor(BoardBestResponseDTO.class,
                        board.boardNo, board.boardCategory,
                        board.boardTitle, board.member_no.memberNickname,
                        board.member_no.memberRandom, board.boardContent , board.member_no.memberFile,
                        board.boardDate, boardLike.likeNo.count()))
                .from(board)
                .join(boardLike)
                .on(board.eq(boardLike.boardNo))
                .groupBy(board.boardNo)
                .having(boardLike.likeNo.count().goe(5))
                .orderBy(board.boardNo.desc())
                .limit(10)
                .offset(page*10)
                .fetch();
    }

    // 게시글 검색
    @Override
    public List<BoardSearchResponseDTO> selectBoardByTitleOrContent(String keyword) {

        return queryFactory.select(Projections.constructor(BoardSearchResponseDTO.class,
                        board.boardNo, board.boardTitle,
                        board.boardContent, board.boardReadCount
                        ))
                .from(board)
                .where(board.boardTitle.like("%" + keyword + "%").or(board.boardContent.like("%" + keyword + "%")))
                .orderBy(board.boardNo.desc())
                .fetch();
    }
}
