package com.basic.deep.member.dto;

import com.basic.deep.board.entity.Category;
import lombok.Data;
import lombok.ToString;

import java.time.LocalDateTime;

@Data
@ToString
public class MemberProfieLikeResponseDTO {
    private Long boardNo;
    private Category category;
    private String boardTitle;
    private String memberNickName;
    private String memberRandom;
    private LocalDateTime boardCreatedTime;
    private Long view;
    private Long like;
    private Long reply;

    public MemberProfieLikeResponseDTO(Long boardNo, Category category ,String boardTitle, String memberNickName, String memberRandom, LocalDateTime boardCreatedTime, Long view) {
        this.boardNo = boardNo;
        this.category = category;
        this.boardTitle = boardTitle;
        this.memberNickName = memberNickName;
        this.memberRandom = memberRandom;
        this.boardCreatedTime = boardCreatedTime;
        this.view = view;
    }
}
