package com.basic.deep.member.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class MemberSignUpRequestDTO {

    @NotBlank
    private String memberID;
    @NotBlank
    private String memberName;
    @Email
    private String memberMail;
    @NotBlank
    private String memberPass;
    @NotBlank
    private String memberPhone;
    private String memberAddress;
    private String memberAddressDetail;
    private String memberZip;

}
