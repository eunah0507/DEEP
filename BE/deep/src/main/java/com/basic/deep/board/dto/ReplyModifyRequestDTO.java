package com.basic.deep.board.dto;

import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class ReplyModifyRequestDTO {
    private Long boardNo;
    private Long replyNo;
    private String replyContent;
}
