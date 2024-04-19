package com.basic.deep.member.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberNo;

    @Column(name = "member_id", length = 100, nullable = false)
    private String memberID;

    @Column(name = "member_name", length = 100, nullable = false)
    private String memberName;

    @Column(name = "member_mail", length = 100, nullable = false)
    private String memberMail;

    @Column(name = "member_pass", length = 2000, nullable = false)
    private String memberPass;

    @Column(name = "member_passhistory", length = 2000, nullable = false)
    private String memberPassHistory;

    @Column(name = "member_phone", length = 100, nullable = false)
    private String memberPhone;

    @Column(name = "member_file", length = 3000)
    private String memberFile;

    @Enumerated(EnumType.STRING)
    @Column(name = "member_social_type")
    private SocialType memberSocialType;

    @Column(name = "member_social_id", length = 500)
    private String memberSocialID;

    @Column(name = "member_token", length = 500)
    private String memberToken;

    @Column(name = "member_address", length = 300)
    private String memberAddress;

    @Column(name = "member_address_detail", length = 300)
    private String memberAddressDetail;

    @Column(name = "member_zip", length = 50)
    private String memberZip;

    @Column(name = "member_date")
    private LocalDateTime memberDate;

    @Column(name = "member_lastlogin")
    private LocalDateTime memberLastLogin;

    @Column(name = "member_nickname", length = 100, nullable = false)
    private String memberNickname;

    @Column(name = "member_introduce", length = 500)
    private String memberIntroduce;

    @Column(name = "member_random", length = 50, nullable = false)
    private String memberRandom;

    @Builder.Default
    @Column(name = "member_isdelete")
    private Boolean memberIsDelete = false;

    @Column(name = "member_delete_time")
    private LocalDateTime memberDeleteTime;



}
