package com.basic.deep.member.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class MyFollower {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long myFollowerPkNo;

    // 내 memberNo
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_no")
    private Member memberNo;

    // 나를 추가한 타인의 memberNo
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "my_follower_no")
    private Member myFollowerNo;


}
