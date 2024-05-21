package com.basic.deep.member.dto;

import com.basic.deep.board.entity.Category;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class MemberOthersReplyResponseDTO {
    private Long boardNo;
    private Category category;
    private String boardTitle;
    private String replyContent;
    private LocalDateTime boardCreateTime;

    public MemberOthersReplyResponseDTO(Long boardNo, Category category, String boardTitle, String replyContent, LocalDateTime boardCreateTime) {
        this.boardNo = boardNo;
        this.category = category;
        this.boardTitle = boardTitle;
        this.replyContent = replyContent;
        this.boardCreateTime = boardCreateTime;
    }
}
