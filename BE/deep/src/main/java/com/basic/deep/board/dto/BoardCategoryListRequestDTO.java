package com.basic.deep.board.dto;

import com.basic.deep.board.entity.Category;
import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class BoardCategoryListRequestDTO {
    private Long page;
    private Category category;
}
