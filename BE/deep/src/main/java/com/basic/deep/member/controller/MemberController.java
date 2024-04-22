package com.basic.deep.member.controller;

import com.basic.deep.member.dto.*;
import com.basic.deep.member.service.MemberService;
import com.basic.deep.config.AuthConfig;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import net.nurigo.sdk.NurigoApp;
import net.nurigo.sdk.message.model.Message;
import net.nurigo.sdk.message.request.SingleMessageSendingRequest;
import net.nurigo.sdk.message.response.SingleMessageSentResponse;
import net.nurigo.sdk.message.service.DefaultMessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpClientErrorException;

import java.util.concurrent.ThreadLocalRandom;

@Slf4j
@RestController
@CrossOrigin("*")
@RequestMapping("/member")
public class MemberController {

    // 휴대폰 인증번호 발신
    public static DefaultMessageService messageService;

    // 관리자가 휴대폰 인증을 보내기 위한 것
    @Autowired
    private AuthConfig authConfig;

    @Autowired
    private MemberService memberService;

    // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    // 여기서부터 휴대폰 인증 Controller
    @Autowired
    public void setDefaultMessageService(AuthConfig authConfig) {
        // 반드시 계정 내 등록된 유효한 API 키, API Secret Key를 입력해주셔야 합니다!
        messageService = NurigoApp.INSTANCE.initialize(authConfig.getCoolsmsapikey(), authConfig.getCoolsmssecretkey(), "https://api.coolsms.co.kr");
    }

    // 회원가입 - 휴대폰 인증 시 6자리 랜덤 숫자 생성
    public static int generateAuthNo1() {
        return ThreadLocalRandom.current().nextInt(100000, 1000000);
    }

    // 회원가입
    // DTO의 @Email 혹은 @NotBlank등을 적용시키기 위해 Vaild 사용
    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody @Valid MemberSignUpRequestDTO memberSignUpRequestDTO) {
        MemberSignUpResponseDTO memberSignUpResponseDTO = memberService.memberSignUp(memberSignUpRequestDTO);
        return new ResponseEntity<MemberSignUpResponseDTO>(memberSignUpResponseDTO, HttpStatus.OK);
    }

    // 휴대폰 인증
    @PostMapping("/signup/phone")
    public ResponseEntity<?> phone(@RequestBody MemberSignUpPhoneRequestDTO memberSignUpPhoneRequestDTO) {
        Message message = new Message();
        int randomPhone = generateAuthNo1();

        // 발신번호 및 수신번호는 반드시 01012345678 형태로 입력되어야 합니다.
        message.setFrom(authConfig.getPhone());
        message.setTo(memberSignUpPhoneRequestDTO.getMemberPhone());
        message.setText("[DEEP] 본인확인 인증번호는 [" + randomPhone + "] 입니다. 인증번호를 입력해주세요.");

        SingleMessageSentResponse response = this.messageService.sendOne(new SingleMessageSendingRequest(message));
        MemberSignUpPhoneResponseDTO memberSignUpPhoneResponseDTO = new MemberSignUpPhoneResponseDTO();
        memberSignUpPhoneResponseDTO.setAuthenticationNumber(String.valueOf(randomPhone));
        return new ResponseEntity<MemberSignUpPhoneResponseDTO>(memberSignUpPhoneResponseDTO, HttpStatus.OK);
    }

    // ID 중복체크
    @GetMapping("/idcheck")
    public ResponseEntity<?> idcheck(@ModelAttribute MemberIdCheckRequestDTO memberIdCheckRequestDTO) {
        Boolean isIdCheck = memberService.memberIdCheck(memberIdCheckRequestDTO);

        return new ResponseEntity<>(isIdCheck, HttpStatus.OK);
    }
}
