package com.basic.deep.member.dto;

import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class MemberOthersProfileRequestDTO {
    private String memberNickName;
    private String memberRandom;
}
