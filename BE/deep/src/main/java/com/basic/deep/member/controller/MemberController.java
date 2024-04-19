package com.basic.deep.member.controller;

import com.basic.deep.member.dto.MemberSignUpRequestDTO;
import com.basic.deep.member.dto.MemberSignUpResponseDTO;
import com.basic.deep.member.service.MemberService;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@CrossOrigin("*")
@RequestMapping("/member")
public class MemberController {
    @Autowired
    private MemberService memberService;

    // 회원가입
    // DTO의 @Email 혹은 @NotBlank등을 적용시키기 위해 Vaild 사용
    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody @Valid MemberSignUpRequestDTO memberSignUpRequestDTO) {
        MemberSignUpResponseDTO memberSignUpResponseDTO = memberService.memberSignUp(memberSignUpRequestDTO);
        return new ResponseEntity<MemberSignUpResponseDTO>(memberSignUpResponseDTO ,HttpStatus.OK);
    }

}
