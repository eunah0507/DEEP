package com.basic.deep.member.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class AddFriends {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long addFriendPkNo;

    // 내 memberNo
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_no")
    private Member memberNo;

    // 내가 추가한 사람(타인)의 memberNo
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "add_friends_no")
    private Member addFriendNo;
}
