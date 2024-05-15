package com.basic.deep.member.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class MemberProfileReplyResponseDTO {
    private Long boardNo;
    private String boardTitle;
    private String replyContent;
    private LocalDateTime boardCreatedTime;

    public MemberProfileReplyResponseDTO(Long boardNo, String boardTitle, String replyContent, LocalDateTime boardCreatedTime) {
        this.boardNo = boardNo;
        this.boardTitle = boardTitle;
        this.replyContent = replyContent;
        this.boardCreatedTime = boardCreatedTime;
    }
}
