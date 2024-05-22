package com.basic.deep.board.dto;

import com.basic.deep.board.entity.Category;
import lombok.Data;
import lombok.ToString;

import java.time.LocalDateTime;
import java.util.List;

@Data
@ToString
public class BoardSearchTagResponseDTO {
    private Long boardNo;
    private Category category;
    private String boardTitle;
    private String memberNickName;
    private String memberRandom;
    private LocalDateTime boardCreatedTime;
    private Long like;
    private Long reply;
    private List<String> tag;

    public BoardSearchTagResponseDTO(Long boardNo, Category category, String boardTitle, String memberNickName, String memberRandom, LocalDateTime boardCreatedTime) {
        this.boardNo = boardNo;
        this.category = category;
        this.boardTitle = boardTitle;
        this.memberNickName = memberNickName;
        this.memberRandom = memberRandom;
        this.boardCreatedTime = boardCreatedTime;
    }
}
