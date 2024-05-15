package com.basic.deep.board.dto;

import com.basic.deep.board.entity.Category;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class BoardBestResponseDTO {
    private Long boardNo;
    private Category category;
    private String boardTitle;
    private String memberNickName;
    private String memberRandom;
    private String memberFile;
    private LocalDateTime boardCreatedTime;
    private Long like;
    private Long reply;

    public BoardBestResponseDTO(Long boardNo, Category category, String boardTitle, String memberNickName, String memberRandom, String memberFile, LocalDateTime boardCreatedTime, Long like) {
        this.boardNo = boardNo;
        this.category = category;
        this.boardTitle = boardTitle;
        this.memberNickName = memberNickName;
        this.memberRandom = memberRandom;
        this.memberFile = memberFile;
        this.boardCreatedTime = boardCreatedTime;
        this.like = like;
    }
}
