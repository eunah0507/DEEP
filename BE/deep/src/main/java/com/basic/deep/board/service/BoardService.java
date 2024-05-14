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

    // 게시글 검색 - memberNo 받아오는 이유 : 내가 좋아요 눌렀는지 여부 확인하려고
    List<BoardSearchResponseDTO> searchBoard(BoardSearchRequestDTO boardSearchRequestDTO, Long memberNo);

    // 게시글 1개 상세조회 > 누구나 볼 수 있으므로 memberNo 불필요하다? No! 내가 좋아요를 눌렀는지 알아야 하므로 필요함
    BoardDetailResponseDTO boardDetail(BoardDetailRequestDTO boardDetailRequestDTO, Long memberNo);

    // 1개 게시판 목록 전체 조회
    BoardCategoryListResponseDTO boardCategoryDetail(BoardCategoryRequestDTO boardCategoryRequestDTO);


}
