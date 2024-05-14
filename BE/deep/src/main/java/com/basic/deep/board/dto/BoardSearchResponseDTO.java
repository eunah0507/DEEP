package com.basic.deep.board.dto;

import lombok.Data;

import java.util.List;

@Data
public class BoardSearchResponseDTO {
    private Long boardNo;
    private String title;
    private String content;
    private int view;
    private int reply;
    private List<String> tag;
}
