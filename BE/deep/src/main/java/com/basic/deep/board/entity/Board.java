package com.basic.deep.board.entity;

import com.basic.deep.member.entity.Member;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class Board {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long boardNo;

    @Column(name = "board_title", length = 500, nullable = false)
    private String boardTitle;

    @Column(name = "board_content", length = 5000, nullable = false)
    private String boardContent;

    @Column(name = "board_date", nullable = false)
    private LocalDateTime boardDate;

    @Column(name = "board_modify_date")
    private LocalDateTime boardModifyDate;

    @Column(name = "board_readcount")
    private int boardReadCount;

    @Enumerated(EnumType.STRING)
    @Column(name = "board_category", nullable = false)
    private Category boardCategory;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_no")
    private Member member_no;

    // 게시글 수정
    public void modifyBoard(String title, Category category, String cotent){
        this.boardTitle = title;
        this.boardCategory = category;
        this.boardContent = cotent;
        this.boardModifyDate = LocalDateTime.now();
    }
}
