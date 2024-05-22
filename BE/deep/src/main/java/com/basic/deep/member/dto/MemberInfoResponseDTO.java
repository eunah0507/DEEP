package com.basic.deep.member.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class MemberInfoResponseDTO {
    private String memberID;
    private String memberMail;
    private String memberName;
    private String memberNickName;
    private String memberRandom;
    private String memberPhone;
    private String memberAddress;
    private String memberAddressDetail;
    private String memberZip;
    private String memberFile;
    private String memberIntroduce;
    private LocalDateTime memberCreated;
    private LocalDateTime memberLastLogin;
}
