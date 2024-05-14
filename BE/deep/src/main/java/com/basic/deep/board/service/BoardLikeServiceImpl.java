package com.basic.deep.board.service;

import com.basic.deep.board.dto.BoardLikeRequestDTO;
import com.basic.deep.board.dto.BoardLikeResponseDTO;
import com.basic.deep.board.entity.Board;
import com.basic.deep.board.entity.BoardLike;
import com.basic.deep.board.repository.BoardLikeRepository;
import com.basic.deep.board.repository.BoardRepository;
import com.basic.deep.member.entity.Member;
import com.basic.deep.member.repository.MemberRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Transactional
public class BoardLikeServiceImpl implements BoardLikeService {

    @Autowired
    private BoardRepository boardRepository;

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private BoardLikeRepository boardLikeRepository;

    // 게시글 좋아요 - 추가, 삭제, 조회 모두
    // 조회를 통해서 true, false 판별
    //
    @Override
    public BoardLikeResponseDTO boardLike(BoardLikeRequestDTO boardLikeRequestDTO, Long memberNo) {
        Member member = memberRepository.getReferenceById(memberNo);

        // Like가 true일 때 > 좋아요 요청한 상태
        if (boardLikeRequestDTO.getLike()) {
            Optional<BoardLike> boardLike = boardLikeRepository.selectBoardLike(boardLikeRequestDTO.getBoardNo(), memberNo);

            // BoardLike가 비어있지 않다면 > BoardLike가 존재한다면 > 좋아요 상태인데 좋아요 요청이 온 것 > 무시한다
            if (!boardLike.isEmpty()) {

            } else {
                // Board를 뽑아온다.
                Board board = boardRepository.getReferenceById(boardLikeRequestDTO.getBoardNo());

                // Board에 Like를 추가한다.
                boardLikeRepository.save(
                        BoardLike.builder()
                                .boardNo(board)
                                .memberNo(member)
                                .build()
                );
            }
            // 좋아요 요청을 취소한 상태
        } else {
            // 다시 boardLike를 받아온다.
            Optional<BoardLike> boardLike = boardLikeRepository.selectBoardLike(boardLikeRequestDTO.getBoardNo(), memberNo);

            // 다시 조건문을 작성한다. 비어있지 않다면 > BoardLike가 존재하면 > 삭제한다.
            if (!boardLike.isEmpty()) {
                boardLikeRepository.deleteBoardLike(boardLikeRequestDTO.getBoardNo(), memberNo);
            }

            // 비어있다면 > 좋아요가 없는 상태 > 없는 상태에서 삭제 요청이 온 것은 무시한다.
            // 그래서 else 적지 않았음.
        }

        BoardLikeResponseDTO boardLikeResponseDTO = new BoardLikeResponseDTO();
        boardLikeResponseDTO.setMessage("Success");

        return boardLikeResponseDTO;
    }
}
