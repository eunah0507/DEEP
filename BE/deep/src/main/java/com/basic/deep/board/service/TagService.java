package com.basic.deep.board.service;

import com.basic.deep.board.dto.BoardSearchTagRequestDTO;
import com.basic.deep.board.dto.BoardSearchTagResponseDTO;

import java.util.List;

public interface TagService {

    // Tag 조회
    List<BoardSearchTagResponseDTO> tagDetail(BoardSearchTagRequestDTO boardSearchTagRequestDTO);
}
