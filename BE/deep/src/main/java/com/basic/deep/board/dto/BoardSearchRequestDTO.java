package com.basic.deep.board.dto;

import lombok.Data;

@Data
public class BoardSearchRequestDTO {
    private String keyword;
    private int page;
}
