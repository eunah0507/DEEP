package com.basic.deep.member.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class MemberProfileReplyResponseDTO {
    private Long boardNo;
    private String boardTitle;
    private String replyContent;
    private LocalDateTime boardCreatedTime;
}
