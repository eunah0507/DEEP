package com.basic.deep.board.dto;

import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class ReplyWriteRequestDTO {
    private Long boardNo;
    private Long parentNo;
    private String replyContent;
}
