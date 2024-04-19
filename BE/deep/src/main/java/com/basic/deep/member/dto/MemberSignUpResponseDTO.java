package com.basic.deep.member.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@NoArgsConstructor
@Data
public class MemberSignUpResponseDTO {

    private String memberID;
    private String memberName;
    private String memberNickname;
    private String memberRandom;
    private LocalDateTime memberDate;

}
