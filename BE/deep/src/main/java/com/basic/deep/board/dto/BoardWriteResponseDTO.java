package com.basic.deep.board.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class BoardWriteResponseDTO {
    private Long boardNo;
    private String memberNickName;
    private String memberRandom;
    private LocalDateTime boardCreatedTime;
}
