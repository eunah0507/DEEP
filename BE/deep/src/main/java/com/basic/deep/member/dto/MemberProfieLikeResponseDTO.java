package com.basic.deep.member.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class MemberProfieLikeResponseDTO {
    private Long boardNo;
    private String boardTitle;
    private String memberNickName;
    private String memberRandom;
    private LocalDateTime boardCreatedTime;
    private Long view;
    private Long like;
    private Long reply;
}
