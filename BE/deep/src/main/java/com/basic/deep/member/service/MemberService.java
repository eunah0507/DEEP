package com.basic.deep.member.service;

import com.basic.deep.member.dto.MemberIdCheckRequestDTO;
import com.basic.deep.member.dto.MemberSignUpRequestDTO;
import com.basic.deep.member.dto.MemberSignUpResponseDTO;

public interface MemberService {


    // 회원가입
    MemberSignUpResponseDTO memberSignUp(MemberSignUpRequestDTO memberSignUpRequestDTO);

    // 회원가입시 ID 중복검사
    Boolean memberIdCheck(MemberIdCheckRequestDTO memberIdCheckRequestDTO);
}
