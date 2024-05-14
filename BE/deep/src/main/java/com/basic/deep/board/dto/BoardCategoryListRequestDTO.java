package com.basic.deep.board.dto;

import com.basic.deep.board.entity.Category;
import lombok.Data;

@Data
public class BoardCategoryListRequestDTO {
    private Long page;
    private Category category;
}
