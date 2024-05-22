package com.basic.deep.board.dto;

import com.basic.deep.board.entity.Category;
import lombok.Data;
import lombok.ToString;

import java.time.LocalDateTime;

@Data
@ToString
public class BoardMainIndexResponseDTO {
    private Long boardNo;
    private Category category;
    private Boolean isBest;
    private String boardTitle;
    private String memberNickName;
    private String memberRandom;
    private String memberFile;
    private LocalDateTime boardCreatedTime;
    private Long like;
    private Long reply;

}
