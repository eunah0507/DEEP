package com.basic.deep.member.dto;

import com.basic.deep.board.entity.Category;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class MemberProfileReplyResponseDTO {
    private Long boardNo;
    private Category category;
    private String boardTitle;
    private String replyContent;
    private LocalDateTime boardCreatedTime;

    public MemberProfileReplyResponseDTO(Long boardNo, Category category ,String boardTitle, String replyContent, LocalDateTime boardCreatedTime) {
        this.boardNo = boardNo;
        this.category = category;
        this.boardTitle = boardTitle;
        this.replyContent = replyContent;
        this.boardCreatedTime = boardCreatedTime;
    }
}
