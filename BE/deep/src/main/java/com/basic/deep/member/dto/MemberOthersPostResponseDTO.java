package com.basic.deep.member.dto;

import com.basic.deep.board.entity.Category;
import lombok.Data;
import lombok.ToString;

import java.time.LocalDateTime;

@Data
@ToString
public class MemberOthersPostResponseDTO {
    private Long boardNo;
    private Category category;
    private String boardTitle;
    private LocalDateTime boardCreateTime;
    private Long view;
    private Long like;
    private Long reply;

    public MemberOthersPostResponseDTO(Long boardNo, Category category, String boardTitle, LocalDateTime boardCreateTime, Long view) {
        this.boardNo = boardNo;
        this.category = category;
        this.boardTitle = boardTitle;
        this.boardCreateTime = boardCreateTime;
        this.view = view;
    }
}
