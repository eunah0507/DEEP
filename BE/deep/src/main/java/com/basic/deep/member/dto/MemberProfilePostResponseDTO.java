package com.basic.deep.member.dto;

import com.basic.deep.board.entity.Category;
import lombok.Data;
import lombok.ToString;

import java.time.LocalDateTime;

@Data
@ToString
public class MemberProfilePostResponseDTO {
    private Long boardNo;
    private Category category;
    private String boardTitle;
    private LocalDateTime boardCreatedTime;
    private Long view;
    private Long like;
    private Long reply;

    public MemberProfilePostResponseDTO(Long boardNo, Category category ,String boardTitle, LocalDateTime boardCreatedTime, Long view) {
        this.boardNo = boardNo;
        this.category = category;
        this.boardTitle = boardTitle;
        this.boardCreatedTime = boardCreatedTime;
        this.view = view;
    }
}
