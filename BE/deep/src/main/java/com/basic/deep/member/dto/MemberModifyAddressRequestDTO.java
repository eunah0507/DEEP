package com.basic.deep.member.dto;

import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class MemberModifyAddressRequestDTO {
    private String memberAddress;
    private String memberAddressDetail;
    private String memberZip;
}
