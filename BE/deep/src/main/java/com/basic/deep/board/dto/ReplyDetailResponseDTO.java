package com.basic.deep.board.dto;

import lombok.Data;
import lombok.ToString;

import java.time.LocalDateTime;

@Data
@ToString
public class ReplyDetailResponseDTO {
    private Long replyNo;
    private String memberNickName;
    private String memberRandom;
    private String memberFile;
    private String replyContent;
    private LocalDateTime replyCreatedTime;

    public ReplyDetailResponseDTO(Long replyNo, String memberNickName,
                                  String memberRandom, String memberFile, String replyContent,
                                  LocalDateTime replyCreatedTime) {
        this.replyNo = replyNo;
        this.memberNickName = memberNickName;
        this.memberRandom = memberRandom;
        this.memberFile = memberFile;
        this.replyContent = replyContent;
        this.replyCreatedTime = replyCreatedTime;
    }
}


