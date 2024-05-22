package com.basic.deep.member.dto;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;
import java.io.Serializable;

@Data
public class MemberModifyRequestDTO implements Serializable {
    private String memberNickName;
    private String memberIntroduce;
    private MultipartFile memberFile;
}
