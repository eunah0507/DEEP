package com.basic.deep.board.dto;

import lombok.Data;
import lombok.ToString;

import java.time.LocalDateTime;

@Data
@ToString
public class ReplyWriteResponseDTO {
    private String memberNickName;
    private String memberRandom;
    private String memberFile;
    private LocalDateTime replyCreatedTime;
    private Long replyNo;
}
