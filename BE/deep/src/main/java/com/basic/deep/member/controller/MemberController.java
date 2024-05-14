package com.basic.deep.member.controller;

import com.basic.deep.auth.jwt.JsonWebToken;
import com.basic.deep.auth.util.JwtTokenUtils;
import com.basic.deep.member.dto.*;
import com.basic.deep.member.service.AddFriendsService;
import com.basic.deep.member.service.MemberService;
import com.basic.deep.config.AuthConfig;
import com.basic.deep.member.service.MyFollowerService;
import com.basic.deep.member.service.S3UploadService;
import com.basic.deep.member.util.EmailUtil;
import io.micrometer.common.util.StringUtils;
import jakarta.mail.Authenticator;
import jakarta.mail.PasswordAuthentication;
import jakarta.mail.Session;
import jakarta.validation.Valid;
import lombok.experimental.PackagePrivate;
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
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;

import javax.swing.text.html.HTML;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Properties;
import java.util.concurrent.ThreadLocalRandom;

import static com.basic.deep.auth.util.JwtTokenUtils.ACCESS_PERIOD;
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

    @Autowired
    private AddFriendsService addFriendsService;

    @Autowired
    private MyFollowerService myFollowerService;

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
            // 프론트 멘토링에서 엑세스토큰도 쿠키에 주라고 조언해줘서 수정함
//            headers.add("Authorization", jsonWebToken.getAccessToken());

            // AccessToken도 쿠키로 준다.
            // 원래 AccssToken을 Authorization이라는 이름으로 줬으나, Access로 변경
            ResponseCookie accessToken = ResponseCookie.from("Access", jsonWebToken.getAccessToken())
                    .sameSite("None")
                    .httpOnly(false)
                    .secure(true)
                    .path("/")
                    .maxAge(ACCESS_PERIOD / 1000)
                    .build();
            headers.add("Set-Cookie", accessToken.toString());

            // 리프레시 토큰을 넣어준다. 해당 member_Token에 들어간다.
            memberService.memberNormalLoginRefreshToken(memberNo, jsonWebToken.getRefreshToken());
            ResponseCookie cookie = ResponseCookie.from("Refresh", jsonWebToken.getRefreshToken())
                    //sameSite == None 으로 하는 순간, 다른 서버(?) 곳 에서도 접속이 가능하다.
                    .sameSite("None")
                    .httpOnly(false)
                    .secure(true)
                    .path("/")
                    .maxAge(REFRESH_PERIOD / 1000)
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
    // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    @PostMapping("/pwfind")
    public ResponseEntity<?> pwfind(@RequestBody MemberPwFindRequsetDTO memberPwFindRequsetDTO) {
        String temporaryPW = getTempPassword();
        String toEmail = memberService.memberPwFind(memberPwFindRequsetDTO, temporaryPW);

        if (toEmail == null) {
            return new ResponseEntity<>("해당 유저의 메일이 존재하지 않습니다. 다시 확인해 주십시오", HttpStatus.BAD_REQUEST);
        } else {
            // 임시비밀번호 발급 메일 전송
            final String fromEmail = authConfig.getEmailId(); // requires valid gmail id
            final String password = authConfig.getEmailPw(); // correct password for gmail id

            System.out.println("TLSEmail Start");
            Properties props = new Properties();
            props.put("mail.smtp.host", "smtp.gmail.com"); // SMTP Host
            props.put("mail.smtp.port", "587"); // TLS Port
            props.put("mail.smtp.auth", "true"); // enable authentication
            props.put("mail.smtp.starttls.enable", "true"); // enable STARTTLS
            props.put("mail.smtp.ssl.protocols", "TLSv1.2");

            // create Authenticator object to pass in Session.getInstance argument
            Authenticator auth = new Authenticator() {
                // override the getPasswordAuthentication method
                protected PasswordAuthentication getPasswordAuthentication() {
                    return new PasswordAuthentication(fromEmail, password);
                }
            };
            Session session = Session.getInstance(props, auth);

            EmailUtil.sendEmail(session, toEmail,
                    "개발자 커뮤니티 [DEEP] 임시 비밀번호 안내 입니다.",
                    "개발자 커뮤니티 [DEEP] 임시 비밀번호 발급 안내입니다.\n\n" +
                            "회원님의 [DEEP] 임시 비밀번호가 발급되었습니다.\n" +
                            "아래의 임시 비밀번호로 로그인 하신 후 비밀번호를 재설정하시기 바랍니다.\n" +
                            "비밀번호 재설정은 설정 > 비밀번호 변경에서 가능합니다.\n" +
                            "\n" +
                            "임시 비밀번호는 복사 + 붙여넣기 대신 직접 입력하여 주시기 바랍니다.\n\n\n" +
                            temporaryPW);

            MemberPwFindResponseDTO memberPwFindResponseDTO = new MemberPwFindResponseDTO();
            memberPwFindResponseDTO.setMemberMail(toEmail);
            return new ResponseEntity<>(memberPwFindResponseDTO, HttpStatus.OK);

        }
    }

    // 랜덤함수로 임시비밀번호 구문 만들기
    public String getTempPassword() {
        char[] charSet = new char[]{'0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F',
                'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'};

        String str = "";

        // 문자 배열 길이의 값을 랜덤으로 10개를 뽑아 구문을 작성함
        int idx = 0;
        for (int i = 0; i < 10; i++) {
            idx = (int) (charSet.length * Math.random());
            str += charSet[idx];
        }
        return str;
    }
    // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

    // memberInfo 조회
    @GetMapping("/info")
    public ResponseEntity<?> info() {
        Long memberNo = Long.parseLong(SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString());
        MemberInfoResponseDTO memberInfoResponseDTO = memberService.memberInfo(memberNo);

        if (memberInfoResponseDTO == null) {
            return new ResponseEntity<>("잘못된 접근입니다. 다시 시도하세요", HttpStatus.BAD_REQUEST);
        } else {
            return new ResponseEntity<>(memberInfoResponseDTO, HttpStatus.OK);
        }
    }

    // 커뮤니티 프로필 수정
    @PutMapping("/modify")
    public ResponseEntity<?> modify(@ModelAttribute MemberModifyRequestDTO memberModifyRequestDTO) {
        Long memberNo = Long.parseLong(SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString());
        MemberModifyResponseDTO memberModifyResponseDTO = memberService.memberModify(memberModifyRequestDTO, memberNo);

        return new ResponseEntity<>(memberModifyResponseDTO, HttpStatus.OK);
    }

    // 개인정보 프로필 수정 - 비밀번호 변경
    @PutMapping("/modify-pass")
    public ResponseEntity<?> modifyPass(@RequestBody MemberModifyPassRequestDTO memberModifyPassRequestDTO) {
        Long memberNo = Long.parseLong(SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString());

        String pass = memberModifyPassRequestDTO.getMemberPass();
        if (StringUtils.isBlank(pass)) {
            return new ResponseEntity<>("비밀번호를 빈 값으로 두면 안됩니다.", HttpStatus.BAD_REQUEST);
        }

        MemberModifyPassResponseDTO memberModifyPassResponseDTO = memberService.memberModifyPass(memberModifyPassRequestDTO, memberNo);

        if (memberModifyPassResponseDTO == null) {
            return new ResponseEntity<>("사용할 수 없는 비밀번호입니다.", HttpStatus.BAD_REQUEST);
        } else {
            return new ResponseEntity<>(memberModifyPassResponseDTO, HttpStatus.OK);
        }
    }

    // 개인정보 프로필 수정 - 메일 변경
    @PutMapping("/modify-mail")
    public ResponseEntity<?> modifyMail(@RequestBody MemberModifyMailRequestDTO memberModifyMailRequestDTO) {
        Long memberNo = Long.parseLong(SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString());

        MemberModifyMailResponseDTO memberModifyMailResponseDTO = memberService.memberModifyMail(memberModifyMailRequestDTO, memberNo);

        return new ResponseEntity<>(memberModifyMailResponseDTO, HttpStatus.OK);
    }

    // 개인정보 프로필 수정 - 주소 변경
    @PutMapping("/modify-address")
    public ResponseEntity<?> modifyAddress(@RequestBody MemberModifyAddressRequestDTO memberModifyAddressRequestDTO) {
        Long memberNo = Long.parseLong(SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString());

        MemberModifyAddressResponseDTO memberModifyAddressResponseDTO = memberService.memberModifyAddress(memberModifyAddressRequestDTO, memberNo);

        return new ResponseEntity<>(memberModifyAddressResponseDTO, HttpStatus.OK);
    }

    // 개인정보 프로필 수정 - 휴대폰 번호 변경
    @PutMapping("/modify-phone")
    public ResponseEntity<?> modifyPhone(@RequestBody MemberModifyPhoneRequestDTO memberModifyPhoneRequestDTO) {
        Long memberNo = Long.parseLong(SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString());

        MemberModifyPhoneResponseDTO memberModifyPhoneResponseDTO = memberService.memberModifyPhone(memberModifyPhoneRequestDTO, memberNo);

        return new ResponseEntity<>(memberModifyPhoneResponseDTO, HttpStatus.OK);

    }

    // 회원 탈퇴
    @DeleteMapping("/delete")
    public ResponseEntity<?> delete() {
        Long memberNo = Long.parseLong(SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString());

        MemberDeleteResponseDTO memberDeleteResponseDTO = memberService.memberDelete(memberNo);
        return new ResponseEntity<>(memberDeleteResponseDTO, HttpStatus.OK);

    }

    // Access Token 값 만료 되었을 경우 Refresh Token 전달 후 새로운 Access Token 생성
    @PostMapping("/accesstoken")
    public ResponseEntity<?> accessToken(@RequestBody SendTokenRequestDTO sendTokenRequestDTO) {
        Long newAccessToken = memberService.isRefreshTokenAndIdOk(sendTokenRequestDTO);

        if (newAccessToken == null) {
            return new ResponseEntity<>("잘못된 처리입니다. 다시 로그인 해주세요.", HttpStatus.BAD_REQUEST);
        } else {
            JsonWebToken jsonWebToken = JwtTokenUtils.allocateToken(newAccessToken, "ROLE_USER");
            MultiValueMap<String, String> headers = new HttpHeaders();
            headers.add("Authorization", jsonWebToken.getAccessToken());

            SendTokenResponseDTO sendTokenResponseDTO = new SendTokenResponseDTO();
            sendTokenResponseDTO.setMessage("Success");

            return new ResponseEntity<>(sendTokenResponseDTO, headers, HttpStatus.OK);
        }
    }


    // 친구 추가(팔로잉)
    @PostMapping("/following")
    public ResponseEntity<?> following(@RequestBody FollowingRequestDTO followingRequestDTO) {
        Long memberNo = Long.parseLong(SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString());

        FollowingResponseDTO followingResponseDTO = myFollowerService.followingOtherUsers(followingRequestDTO, memberNo);
        FollowingResponseDTO followingResponseDDTTOO = addFriendsService.followingOtherUsers(followingRequestDTO, memberNo);

        if (followingResponseDDTTOO == null || followingResponseDTO == null) {
            return new ResponseEntity<>("잘못된 접근입니다. 친구 추가가 되지 않았습니다.", HttpStatus.BAD_REQUEST);
        } else {
            return new ResponseEntity<>(followingResponseDDTTOO, HttpStatus.OK);
        }
    }

    // 친구 삭제(언팔로우)
    @DeleteMapping("/unfollowing")
    public ResponseEntity<?> unfollowing(@RequestBody UnFollowingRequestDTO unFollowingRequestDTO) {
        Long memberNo = Long.parseLong(SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString());

        UnFollowingResponseDTO unFollowingResponseDTO = myFollowerService.unfollowingOtherUsers(unFollowingRequestDTO, memberNo);
        UnFollowingResponseDTO unFollowingResponseDDTTOO = addFriendsService.unFollowingOtherUsers(unFollowingRequestDTO, memberNo);

        if (unFollowingResponseDDTTOO == null || unFollowingResponseDTO == null) {
            return new ResponseEntity<>("잘못된 접근입니다. 친구 삭제가 되지 않았습니다.", HttpStatus.BAD_REQUEST);
        } else {
            return new ResponseEntity<>(unFollowingResponseDTO, HttpStatus.OK);
        }
    }

    // 프로필 - 팔로워 목록 보기 (타인 > 나)
    @PostMapping("/my-follower")
    public ResponseEntity<?> myFollowerList(@RequestBody MyFollowerListRequestDTO myFollowerListRequestDTO) {

        List<MyFollowerListResponseDTO> myFollowerListResponseDTO = myFollowerService.myFollowerList(myFollowerListRequestDTO);

        if (myFollowerListResponseDTO == null) {
            return new ResponseEntity<>("조회하려는 유저가 존재하지 않습니다.", HttpStatus.BAD_REQUEST);
        } else {
            return new ResponseEntity<>(myFollowerListResponseDTO, HttpStatus.OK);
        }
    }

    // 프로필 - 팔로잉 목록 보기 (나 > 타인)
    @PostMapping("/add-friends")
    public ResponseEntity<?> addFriendsList(@RequestBody AddFriendsListRequestDTO addFriendsListRequestDTO) {

        List<AddFriendsListResponseDTO> addFriendsListResponseDTO = addFriendsService.addFriendsList(addFriendsListRequestDTO);

        if (addFriendsListRequestDTO == null) {
            return new ResponseEntity<>("조회하려는 유저가 존재하지 않습니다. 다시 확인해주세요", HttpStatus.BAD_REQUEST);
        } else {
            return new ResponseEntity<>(addFriendsListResponseDTO, HttpStatus.OK);
        }
    }

    // 유저 검색
    @PostMapping("/search")
    public ResponseEntity<?> searchMember(@RequestBody MemberSearchRequestDTO memberSearchRequestDTO) {
        List<MemberSearchResponseDTO> memberSearchResponseDTOS = memberService.searchMember(memberSearchRequestDTO);
        return new ResponseEntity<>(memberSearchResponseDTOS, HttpStatus.OK);
    }

    // 다른 유저의 프로필 보기
    @PostMapping("/others")
    public ResponseEntity<?> othersProfile(@RequestBody MemberOthersProfileRequestDTO memberOthersProfileRequestDTO) {
        MemberOthersProfileResponseDTO memberOthersProfileResponseDTO = memberService.othersProfile(memberOthersProfileRequestDTO);

        if (memberOthersProfileResponseDTO == null) {
            return new ResponseEntity<>("해당 유저가 존재하지 않습니다.", HttpStatus.BAD_REQUEST);
        } else {
            return new ResponseEntity<>(memberOthersProfileResponseDTO, HttpStatus.OK);
        }
    }

    // [커뮤니티 프로필] 마이 페이지 - 내가 쓴 글 확인
    @GetMapping("/profile-post")
    public ResponseEntity<?> profilePost(){

        return new ResponseEntity<>(HttpStatus.OK);
    }

    // [커뮤니티 프로필] 마이 페이지 - 내가 쓴 댓글 확인
    @GetMapping("/profile-reply")
    public ResponseEntity<?> profileReply(){

        return new ResponseEntity<>(HttpStatus.OK);
    }



    // [커뮤니티 프로필] 마이 페이지 - 내가 누른 좋아요 확인
    @GetMapping("/profile-like")
    private ResponseEntity<?> profileLike(){

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
