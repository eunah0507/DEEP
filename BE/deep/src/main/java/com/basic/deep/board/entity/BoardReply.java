package com.basic.deep.board.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class BoardReply {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long ReplyNo;

    @Column(name = "reply_nickname", length = 100, nullable = false)
    private String replyNickName;

    @Column(name = "reply_random", length = 100, nullable = false)
    private String replyRandom;

    @Column(name = "reply_img", length = 3000)
    private String replyImg;

    @Column(name = "reply_content", length = 800, nullable = false)
    private String replyContent;

    @Column(name = "reply_datetime")
    private LocalDateTime replyDate;

    @Column(name = "reply_modify_date")
    private LocalDateTime replyModifyDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "board_no")
    private Board boardNo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_no")
    private BoardReply parentNo;

    // 댓글 수정
    public void modifyReply(String content){
        this.replyContent = content;
        this.replyModifyDate = LocalDateTime.now();
    }
}
