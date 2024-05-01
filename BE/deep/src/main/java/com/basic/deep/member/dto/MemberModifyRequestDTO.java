package com.basic.deep.member.dto;

import lombok.Data;

@Data
public class MemberModifyRequestDTO {
    private String memberNickName;
    private String memberIntroduce;
    private String memberFile;
}
