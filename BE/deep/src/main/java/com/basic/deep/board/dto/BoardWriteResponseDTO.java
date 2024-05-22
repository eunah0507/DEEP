package com.basic.deep.board.dto;

import lombok.Data;
import lombok.ToString;

import java.time.LocalDateTime;

@Data
@ToString
public class BoardWriteResponseDTO {
    private Long boardNo;
    private String memberNickName;
    private String memberRandom;
    private LocalDateTime boardCreatedTime;
}
