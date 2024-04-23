package com.basic.deep.member.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class MemberIdFindResponseDTO {
    private String memberID;
    private String memberNickName;
    private String memberRandom;
    private LocalDateTime memberDate;
}
