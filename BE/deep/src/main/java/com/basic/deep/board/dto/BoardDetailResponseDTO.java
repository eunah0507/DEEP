package com.basic.deep.board.dto;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class BoardDetailResponseDTO {
    private String title;
    private String content;
    private String memberNickName;
    private String memberRandom;
    private String memberFile;
    private LocalDateTime boardCreatedTime;
    private Long view;
    private List<String> img;
    private Boolean meLike;
    private Long like;
    private Long reply;
    private List<String> tag;
}
