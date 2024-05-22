package com.basic.deep.board.dto;

import lombok.Data;
import lombok.ToString;
import org.springframework.web.multipart.MultipartFile;

import java.io.Serializable;

@Data
@ToString
public class BoardImgRequestDTO implements Serializable {
    private MultipartFile img;
}
