package com.basic.deep.board.dto;

import lombok.Data;

@Data
public class BoardSearchTagRequestDTO {
    private String tag;
    private Long page;
}
