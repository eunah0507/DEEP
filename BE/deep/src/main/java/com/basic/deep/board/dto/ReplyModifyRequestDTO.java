package com.basic.deep.board.dto;

import lombok.Data;

@Data
public class ReplyModifyRequestDTO {
    private Long boardNo;
    private Long replyNo;
    private String replyContent;
}
