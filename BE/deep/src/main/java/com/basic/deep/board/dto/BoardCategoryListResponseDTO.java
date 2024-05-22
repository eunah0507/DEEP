package com.basic.deep.board.dto;

import lombok.Data;
import lombok.ToString;

import java.time.LocalDateTime;
import java.util.List;

@Data
@ToString
public class BoardCategoryListResponseDTO {
    private Long boardNo;
    private String boardTitle;
    private String boardContent;
    private String memberNickName;
    private String memberRandom;
    private String memberFile;
    private LocalDateTime boardCreatedTime;
    private Long view;
    private Long like;
    private Long reply;
    private List<String> tag;

    public BoardCategoryListResponseDTO(Long boardNo, String boardTitle, String boardContent, String memberNickName, String memberRandom, String memberFile, LocalDateTime boardCreatedTime, Long view) {
        this.boardNo = boardNo;
        this.boardTitle = boardTitle;
        this.boardContent = boardContent;
        this.memberNickName = memberNickName;
        this.memberRandom = memberRandom;
        this.memberFile = memberFile;
        this.boardCreatedTime = boardCreatedTime;
        this.view = view;
    }

}
