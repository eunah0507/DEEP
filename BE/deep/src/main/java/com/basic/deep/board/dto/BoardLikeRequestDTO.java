package com.basic.deep.board.dto;

import lombok.Data;

@Data
public class BoardLikeRequestDTO {
    private Long boardNo;
    private Boolean like;
}
