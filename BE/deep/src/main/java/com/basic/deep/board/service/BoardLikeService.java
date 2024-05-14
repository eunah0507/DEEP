package com.basic.deep.board.service;

import com.basic.deep.board.dto.BoardLikeRequestDTO;
import com.basic.deep.board.dto.BoardLikeResponseDTO;

public interface BoardLikeService {

    // 게시글 좋아요 - 추가, 조회, 삭제 전부
    BoardLikeResponseDTO boardLike(BoardLikeRequestDTO boardLikeRequestDTO, Long memberNo);
}
