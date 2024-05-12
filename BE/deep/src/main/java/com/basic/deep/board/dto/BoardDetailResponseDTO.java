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
    private LocalDateTime boardCreatedTime;
    private int view;
    private List<MultipartFile> img;
    private Boolean meLike;
    private int like;
    private int reply;
    private List<String> tag;
}
