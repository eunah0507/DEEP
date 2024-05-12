package com.basic.deep.board.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ReplyModifyResponseDTO {
    private String memberNickName;
    private String memberRandom;
    private LocalDateTime replyCreatedTime;
    private LocalDateTime replyUpdateTim;
}
