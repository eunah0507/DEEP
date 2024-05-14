package com.basic.deep.board.dto;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class BoardCategoryListResponseDTO {
    private Long boardNo;
    private String boardTitle;
    private String boardCotent;
    private String memberNickName;
    private String memberRandom;
    private LocalDateTime boardCreatedTime;
    private Long view;
    private Long like;
    private Long reply;
    private List<String> tag;
}
