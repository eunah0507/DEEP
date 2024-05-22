package com.basic.deep.member.dto;

import lombok.Data;

@Data
public class SendTokenRequestDTO {
    private String memberID;
    private String memberToken;
}
