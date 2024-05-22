package com.basic.deep.member.dto;

import lombok.Data;
import lombok.ToString;
import org.springframework.web.multipart.MultipartFile;

import java.io.Serializable;

@Data
@ToString
public class MemberOthersProfileResponseDTO implements Serializable {
    private String memberNickName;
    private String memberRandom;
    private String memberFile;
    private String memberIntroduce;
}
