package com.basic.deep.member.entity;

import jakarta.persistence.*;
import lombok.*;
import org.mindrot.jbcrypt.BCrypt;

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

    @Column(name = "member_id", length = 100, unique = true)
    private String memberID;

    @Column(name = "member_name", length = 100, nullable = false)
    private String memberName;

    @Column(name = "member_mail", length = 100, nullable = false)
    private String memberMail;

    @Column(name = "member_pass", length = 2000, nullable = false)
    private String memberPass;

    @Builder.Default
    @Column(name = "member_passhistory", length = 2000, nullable = false)
    private String memberPassHistory = BCrypt.hashpw("0", BCrypt.gensalt());

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

    // 일반 & 소셜로그인시 Refresh Token DB 저장
    public void changeToken(String memberToken) {
        this.memberToken = memberToken;
        this.memberLastLogin = LocalDateTime.now();
    }

    // 임시비밀번호로 비밀번호 변경
    public void changePass(String memberPass){
        this.memberPass = BCrypt.hashpw(memberPass, BCrypt.gensalt());
    }

    // 커뮤니티 내 프로필 수정
    public void chageModify(String memberNickname, String memberIntroduce, String memberFile){
        this.memberNickname = memberNickname;
        this.memberIntroduce = memberIntroduce;
        this.memberFile = memberFile;
    }

    // 개인정보 프로필 수정
    public void changePrivateModify(String memberMail,
                                    String memberName,
                                    String memberPass,
                                    String memberPhone,
                                    String memberAddress,
                                    String memberAddressDetail,
                                    String memberZip){
        this.memberMail = memberMail;
        this.memberName = memberName;
        this.memberPass = memberPass;
        this.memberPhone = memberPhone;
        this.memberAddress = memberAddress;
        this.memberAddressDetail = memberAddressDetail;
        this.memberZip = memberZip;
    }

    // 개인 프로필 편집 - 비밀번호 변경
    public void memberUpdatePW(String changePW){
        this.memberPass = BCrypt.hashpw(changePW, BCrypt.gensalt());
    }

    // 개인 프로필 편집 - 이메일 변경
    public void memberUpdateMail(String changeMail){
        this.memberMail = changeMail;
    }

    // 개인 프로필 편집 - 주소 변경
    public void memberUpdateAddress(String changeAddress, String changeAddressDetail, String changeAddressZip){
        this.memberAddress = changeAddress;
        this.memberAddressDetail = changeAddressDetail;
        this.memberZip = changeAddressZip;
    }

    // 개인 프로필 편집 - 휴대폰 변경
    public void memberUpdatePhone(String changePhone){
        this.memberPhone = changePhone;
    }
}
