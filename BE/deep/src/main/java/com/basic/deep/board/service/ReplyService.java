package com.basic.deep.board.service;

import com.basic.deep.board.dto.*;

import java.util.List;

public interface ReplyService {

    // 댓글 작성
    ReplyWriteResponseDTO replyWrite(ReplyWriteRequestDTO replyWriteRequestDTO, Long memberNo);

    // 댓글 수정
    ReplyModifyResponseDTO replyModify(ReplyModifyRequestDTO replyModifyRequestDTO, Long memberNo);

    // 댓글 삭제
    ReplyDeleteResponseDTO replyDelete(ReplyDeleteRequestDTO replyDeleteRequestDTO, Long memberNo);

    // 게시글 1개 상세 조회 > 댓글 전체 조회
    List<ReplyDetailResponseDTO> replyDatail(ReplyDetailRequestDTO replyDetailRequestDTO);

}
