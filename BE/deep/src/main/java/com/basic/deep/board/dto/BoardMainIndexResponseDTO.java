package com.basic.deep.board.dto;

import com.basic.deep.board.entity.Category;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class BoardMainIndexResponseDTO {
    private Long boardNo;
    private Category category;
    private String boardTitle;
    private String memberNickName;
    private String memberRandom;
    private LocalDateTime boardCreatedTime;
    private Long like;
    private Long reply;
}
