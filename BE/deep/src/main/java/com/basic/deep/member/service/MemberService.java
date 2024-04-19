package com.basic.deep.member.service;

import com.basic.deep.member.dto.MemberSignUpRequestDTO;
import com.basic.deep.member.dto.MemberSignUpResponseDTO;

public interface MemberService {


    // 회원가입
    MemberSignUpResponseDTO memberSignUp(MemberSignUpRequestDTO memberSignUpRequestDTO);
}
