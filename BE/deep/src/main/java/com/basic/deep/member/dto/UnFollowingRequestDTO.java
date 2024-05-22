package com.basic.deep.member.dto;

import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class UnFollowingRequestDTO {
    private String memberNickName;
    private String memberRandom;
}
