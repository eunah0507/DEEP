package com.basic.deep.member.dto;

import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class MyFollowerListResponseDTO {
    private String memberNickName;
    private String memberRandom;
    private String memberFile;
    private String memberIntroduce;

    public MyFollowerListResponseDTO(String memberNickName, String memberRandom, String memberFile, String memberIntroduce) {
        this.memberNickName = memberNickName;
        this.memberRandom = memberRandom;
        this.memberFile = memberFile;
        this.memberIntroduce = memberIntroduce;
    }
}
