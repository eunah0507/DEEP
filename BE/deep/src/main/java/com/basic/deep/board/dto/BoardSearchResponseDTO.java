package com.basic.deep.board.dto;

import lombok.Data;

import java.util.List;

@Data
public class BoardSearchResponseDTO {
    private Long boardNo;
    private String title;
    private String memberNickName;
    private String memberRandom;
    private String content;
    private Long like;
    private Long view;
    private Long reply;
    private List<String> tag;

    public BoardSearchResponseDTO(Long boardNo, String title, String content, Long view) {
        this.boardNo = boardNo;
        this.title = title;
        this.content = content;
        this.view = view;
    }
}
