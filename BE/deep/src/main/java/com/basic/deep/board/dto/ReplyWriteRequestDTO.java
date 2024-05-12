package com.basic.deep.board.dto;

import lombok.Data;

@Data
public class ReplyWriteRequestDTO {
    private Long boardNo;
    private Long parentNo;
    private String replyContent;
}
