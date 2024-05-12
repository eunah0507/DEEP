package com.basic.deep.board.service;

import com.basic.deep.board.dto.*;

public interface ReplyService {

    // 댓글 작성
    ReplyWriteResponseDTO replyWrite(ReplyWriteRequestDTO replyWriteRequestDTO, Long memberNo);

    // 댓글 수정
    ReplyModifyResponseDTO replyModify(ReplyModifyRequestDTO replyModifyRequestDTO, Long memberNo);

    // 댓글 삭제
    ReplyDeleteResponseDTO replyDelete(ReplyDeleteRequestDTO replyDeleteRequestDTO, Long memberNo);
}
