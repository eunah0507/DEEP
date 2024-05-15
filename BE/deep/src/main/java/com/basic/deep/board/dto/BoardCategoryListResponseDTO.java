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
    private String memberFile;
    private LocalDateTime boardCreatedTime;
    private Long view;
    private Long like;
    private Long reply;
    private List<String> tag;

    public BoardCategoryListResponseDTO(Long boardNo, String boardTitle, String boardCotent, String memberNickName, String memberRandom, String memberFile, LocalDateTime boardCreatedTime, Long view) {
        this.boardNo = boardNo;
        this.boardTitle = boardTitle;
        this.boardCotent = boardCotent;
        this.memberNickName = memberNickName;
        this.memberRandom = memberRandom;
        this.memberFile = memberFile;
        this.boardCreatedTime = boardCreatedTime;
        this.view = view;
    }

}
