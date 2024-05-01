package com.basic.deep.member.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class Fan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long followerPkNo;

    // 내 memberNo
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_no")
    private Member memberNo;

    // 나를 추가한 타인의 memberNo
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "follower_no")
    private Member followerNo;


}
