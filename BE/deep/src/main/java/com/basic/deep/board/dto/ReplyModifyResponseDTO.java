package com.basic.deep.board.dto;

import lombok.Data;
import lombok.ToString;

import java.time.LocalDateTime;

@Data
@ToString
public class ReplyModifyResponseDTO {
    private String memberNickName;
    private String memberRandom;
    private String memberFile;
    private LocalDateTime replyCreatedTime;
    private LocalDateTime replyUpdateTim;
}
