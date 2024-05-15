package com.basic.deep.board.service;

import com.basic.deep.board.dto.*;

import java.util.List;

public interface BoardService {

    // 게시글 작성
    BoardWriteResponseDTO boardWrite(BoardWriteRequestDTO boardWriteRequestDTO, Long memberNo);

    // 게시글 수정
    BoardModifyResponseDTO boardModify(BoardModifyRequestDTO boardModifyRequestDTO, Long memberNo);

    // 게시글 삭제
    BoardDeleteResponseDTO boardDelete(BoardDeleteRequestDTO boardDeleteRequestDTO, Long memberNo);

    // 게시글 검색
    List<BoardSearchResponseDTO> searchBoard(BoardSearchRequestDTO boardSearchRequestDTO);

    // 게시글 1개 상세조회 > 누구나 볼 수 있으므로 memberNo 불필요하다? No! 내가 좋아요를 눌렀는지 알아야 하므로 필요함
    BoardDetailResponseDTO boardDetail(BoardDetailRequestDTO boardDetailRequestDTO, Long memberNo);

    // 1개 게시판 목록 전체 조회
    List<BoardCategoryListResponseDTO> boardCategoryDetail(BoardCategoryListRequestDTO boardCategoryListRequestDTO);

    // 게시글 목록 조회 : 메인 페이지용
    List<BoardMainIndexResponseDTO> boardMainPage();

    // 인기글 게시판 목록 조회
    List<BoardBestResponseDTO> boardBest(BoardBestRequestDTO boardBestRequestDTO);


}
