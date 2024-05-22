package com.basic.deep.member.dto;

import lombok.Data;
import lombok.ToString;

import java.time.LocalDateTime;

@Data
@ToString
public class MemberIdFindResponseDTO {
    private String memberID;
    private String memberNickName;
    private String memberRandom;
    private LocalDateTime memberDate;
}
