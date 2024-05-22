package com.basic.deep.board.dto;

import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class BoardSearchTagRequestDTO {
    private String tag;
    private Long page;
}
