package com.basic.deep.board.dto;

import com.basic.deep.board.entity.Category;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.io.Serializable;
import java.util.List;

@Data
public class BoardModifyRequestDTO implements Serializable {
    private Long boardNo;
    private String title;
    private Category category;
    private String content;
    private List<MultipartFile> img;
    private List<String> tag;
}
