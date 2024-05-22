package com.basic.deep.board.dto;

import com.basic.deep.board.entity.Category;
import lombok.Data;

import java.util.List;

@Data
public class BoardSearchResponseDTO {
    private Long boardNo;
    private Category category;
    private String title;
    private String memberNickName;
    private String memberRandom;
    private String content;
    private Long like;
    private Long view;
    private Long reply;
    private List<String> tag;

    public BoardSearchResponseDTO(Long boardNo, Category category, String title, String content, Long view) {
        this.boardNo = boardNo;
        this.category = category;
        this.title = title;
        this.content = content;
        this.view = view;
    }
}
