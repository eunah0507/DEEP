package com.basic.deep.member.service;

import com.basic.deep.member.dto.MemberSignUpRequestDTO;
import com.basic.deep.member.dto.MemberSignUpResponseDTO;
import com.basic.deep.member.entity.Member;
import com.basic.deep.member.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class MemberServiceImpl implements MemberService{

    @Autowired
    private MemberRepository memberRepository;

    // 닉네임 부여
    String [] nick1 = new String []{"빨간", "멋쟁이", "노란", "오렌지", "훈훈한"};
    String [] nick2 = new String []{"자동차", "오렌지", "미남", "차은우"};

    // 회원가입
    @Override
    public MemberSignUpResponseDTO memberSignUp(MemberSignUpRequestDTO memberSignUpRequestDTO) {

        // 랜덤 숫자태그 주려고 만든 코드
        int authNo = (int)(Math.random() * (99999 - 10000 + 1)) + 10000;

        Member memberSignup = memberRepository.save(
                Member.builder()
                        .memberID(memberSignUpRequestDTO.getMemberID())
                        .memberName(memberSignUpRequestDTO.getMemberName())
                        .memberMail(memberSignUpRequestDTO.getMemberMail())
                        .memberPass(memberSignUpRequestDTO.getMemberPass())
                        .memberPhone(memberSignUpRequestDTO.getMemberPhone())
                        .memberAddress(memberSignUpRequestDTO.getMemberAddress())
                        .memberAddressDetail(memberSignUpRequestDTO.getMemberAddressDetail())
                        .memberZip(memberSignUpRequestDTO.getMemberZip())
                        .memberPassHistory("")
                        .memberNickname(nick1[(int)(Math.random() * nick1.length)] + nick2[(int)(Math.random() * nick2.length)])
                        .memberRandom("#" + authNo)
                        .memberDate(LocalDateTime.now())
                        .build()
        );

        MemberSignUpResponseDTO memberSignUpResponseDTO = new MemberSignUpResponseDTO();

        memberSignUpResponseDTO.setMemberID(memberSignup.getMemberID());
        memberSignUpResponseDTO.setMemberName(memberSignup.getMemberName());
        memberSignUpResponseDTO.setMemberNickname(memberSignup.getMemberNickname());
        memberSignUpResponseDTO.setMemberRandom(memberSignup.getMemberRandom());
        memberSignUpResponseDTO.setMemberDate(memberSignup.getMemberDate());

        return memberSignUpResponseDTO;
    }
}
