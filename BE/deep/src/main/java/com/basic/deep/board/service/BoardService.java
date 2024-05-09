package com.basic.deep.board.service;

import com.basic.deep.board.dto.BoardWriteRequestDTO;
import com.basic.deep.board.dto.BoardWriteResponseDTO;

public interface BoardService {

    // 게시글 작성
    BoardWriteResponseDTO boardWrite(BoardWriteRequestDTO boardWriteRequestDTO, Long memberNo);
}
