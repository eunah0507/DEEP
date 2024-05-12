package com.basic.deep.board.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ReplyWriteResponseDTO {
    private String memberNickName;
    private String memberRandom;
    private LocalDateTime replyCreatedTime;
    private Long replyNo;
}
