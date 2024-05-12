package com.basic.deep.board.service;

import com.basic.deep.board.dto.*;

public interface BoardService {

    // 게시글 작성
    BoardWriteResponseDTO boardWrite(BoardWriteRequestDTO boardWriteRequestDTO, Long memberNo);

    // 게시글 수정
    BoardModifyResponseDTO boardModify(BoardModifyRequestDTO boardModifyRequestDTO, Long memberNo);

    // 게시글 삭제
    BoardDeleteResponseDTO boardDelete(BoardDeleteRequestDTO boardDeleteRequestDTO, Long memberNo);

    // 게시글 1개 상세조회 > 누구나 볼 수 있으므로 memberNo 불필요
//    BoardDetailResponseDTO boardDetail(BoardDetailRequestDTO boardDetailRequestDTO);
}
