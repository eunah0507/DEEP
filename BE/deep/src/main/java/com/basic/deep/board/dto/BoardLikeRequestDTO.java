package com.basic.deep.board.dto;

import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class BoardLikeRequestDTO {
    private Long boardNo;
    private Boolean like;
}
