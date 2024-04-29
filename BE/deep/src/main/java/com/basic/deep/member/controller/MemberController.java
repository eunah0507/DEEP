package com.basic.deep.member.controller;

import com.basic.deep.auth.jwt.JsonWebToken;
import com.basic.deep.auth.util.JwtTokenUtils;
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
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpClientErrorException;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ThreadLocalRandom;

import static com.basic.deep.auth.util.JwtTokenUtils.REFRESH_PERIOD;

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

    // 일반 로그인
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody MemberLoginRequestDTO memberLoginRequestDTO) {
        Map<String, String> responsebody = new HashMap<>();
        responsebody.put("message", "Success");
        Long memberNo = memberService.memberLogin(memberLoginRequestDTO);

        if (memberNo == null) {
            return new ResponseEntity<>("ID와 PW를 다시 확인해주세요", HttpStatus.BAD_REQUEST);
        } else {
            JsonWebToken jsonWebToken = JwtTokenUtils.allocateToken(memberNo, "ROLE_USER");
            MultiValueMap<String, String> headers = new HttpHeaders();
            // 엑세스 토큰을 넣어준다. 헤더에 들어간다. DB에는 저장되지 않는다.
            headers.add("Authorization", jsonWebToken.getAccessToken());

            // 리프레시 토큰을 넣어준다. 해당 member_Token에 들어간다.
            memberService.memberNormalLoginRefreshToken(memberNo, jsonWebToken.getRefreshToken());
            ResponseCookie cookie = ResponseCookie.from("Refresh", jsonWebToken.getRefreshToken())
                    //sameSite == None 으로 하는 순간, 다른 서버(?) 곳 에서도 접속이 가능하다.
                    .sameSite("None")
                    .secure(true)
                    .path("/")
                    .maxAge(REFRESH_PERIOD)
                    .build();
            headers.add("Set-Cookie", cookie.toString());
            return new ResponseEntity<>(responsebody, headers, HttpStatus.OK);
        }
    }

    // ID 찾기
    @PostMapping("/idfind")
    public ResponseEntity<?> idfind(@RequestBody MemberIdFindRequestDTO memberIdFindRequestDTO) {
        List<MemberIdFindResponseDTO> memberIdFindResponseDTO = memberService.idFind(memberIdFindRequestDTO);

        if (memberIdFindResponseDTO.isEmpty()) {
            return new ResponseEntity<>("해당 ID가 존재하지 않습니다.", HttpStatus.BAD_REQUEST);
        } else {
            return new ResponseEntity<>(memberIdFindResponseDTO, HttpStatus.OK);
        }
    }

    // PW 찾기


}
