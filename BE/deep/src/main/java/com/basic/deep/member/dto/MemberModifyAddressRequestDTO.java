package com.basic.deep.member.dto;

import lombok.Data;

@Data
public class MemberModifyAddressRequestDTO {
    private String memberAddress;
    private String memberAddressDetail;
    private String memberZip;
}
