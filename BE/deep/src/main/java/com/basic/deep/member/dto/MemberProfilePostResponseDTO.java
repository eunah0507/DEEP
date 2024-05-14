package com.basic.deep.member.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class MemberProfilePostResponseDTO {
    private Long boardNo;
    private String boardTitle;
    private LocalDateTime boardCreatedTime;
    private Long view;
    private Long like;
    private Long reply;

    public MemberProfilePostResponseDTO(Long boardNo, String boardTitle, LocalDateTime boardCreatedTime, Long view) {
        this.boardNo = boardNo;
        this.boardTitle = boardTitle;
        this.boardCreatedTime = boardCreatedTime;
        this.view = view;
    }
}
