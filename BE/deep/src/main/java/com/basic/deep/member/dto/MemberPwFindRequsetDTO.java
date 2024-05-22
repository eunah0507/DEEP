package com.basic.deep.member.dto;

import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class MemberPwFindRequsetDTO {
    private String memberID;
    private String memberName;
    private String memberPhone;
}
