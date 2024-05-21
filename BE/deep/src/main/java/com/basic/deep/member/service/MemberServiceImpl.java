package com.basic.deep.member.service;

import com.basic.deep.board.repository.BoardLikeRepository;
import com.basic.deep.board.repository.BoardRepository;
import com.basic.deep.board.repository.ReplyRepository;
import com.basic.deep.board.service.BoardLikeService;
import com.basic.deep.board.service.BoardService;
import com.basic.deep.board.service.ReplyService;
import com.basic.deep.member.dto.*;
import com.basic.deep.member.entity.Member;
import com.basic.deep.member.entity.SocialType;
import com.basic.deep.member.repository.MemberRepository;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
// Transactional을 쓴 이유 : insert, update를 쓸 때에는 보안상의 이유로 넣는다.
// 애노테이션을 쓰는 방법이 있고(전역으로 사용), 함수명에만 쓰는 경우도 있다.(지역으로 사용)
@Transactional
public class MemberServiceImpl implements MemberService {

    @Autowired
    private MemberRepository memberRepository;

    // 이미지 등록시 사용하는 S3
    @Autowired
    private S3UploadService s3UploadService;

    @Autowired
    private ReplyRepository replyRepository;

    @Autowired
    private BoardLikeRepository boardLikeRepository;

    @Autowired
    private BoardRepository boardRepository;

    // 닉네임 부여
    String[] nick1 = new String[]{"빨간", "멋쟁이", "노란", "오렌지", "훈훈한", "커다란", "멋진", "진정한", "힘든", "피곤한",
            "졸린", "멍한", "즐거운", "재밌는", "신나는", "잠든", "꿈꾸는", "깨어난", "출근하는", "밥먹는",
            "귀여운", "사랑스러운", "풋풋한", "힙한", "MZ", "잘나가는", "촘촘한", "섬세한", "털털한", "진중한",
            "과묵한", "예민한", "부드러운", "압도적인", "파란", "까만", "시원한", "추운", "따듯한", "따스한",
            "뜨거운", "차가운", "맛있는", "베이지", "옐로우", "핑크", "신사", "숙녀", "당신은", "나는", "우리는",
            "저는", "쇤네는", "너그러운", "용감한", "어설픈", "공손한", "정중한", "민첩한", "기민한", "곤란한",
            "풍부한", "근면한", "성실한", "단호한", "느긋한", "외향적인", "내향적인", "관대한", "상냥한", "후한",
            "까다로운", "진실한", "이기적인", "사교적인", "다재다능한", "검소한", "소박한", "빈곤한", "거지", "부자",
            "화창한", "펑펑눈", "안개", "구름낀", "흐린", "습한", "축축한", "눅눅한", "맑은", "후텁지근한", "쓴",
            "바삭한", "짭짤한", "심심한", "짜릿한", "퀴퀴한", "아늑한", "유치한", "고집센", "악귀", "힘겨운", "탁한",
            "버릇없는", "금쪽이", "편리한", "달콤한", "큰", "작은", "좋은", "나쁜", "가난한", "개미", "세력", "대담한",
            "건방진", "곧은", "철저한", "성가신", "격분한", "심각한", "언짢은", "복잡한", "화려한", "돌보는", "사장",
            "CEO", "사려깊은", "싱싱한", "상한", "드르렁", "드르르렁", "어쩌구", "저쩌구", "솰라솰라", "랄랄랄", "설마",
            "퇴근한", "출근한", "야근한", "노비", "노예", "인턴", "정규직", "새까만", "오류난", "어?", "어라?",
            "집가고픈", "눕고싶은", "자고싶은", "놀고싶은", "외면하는", "무시하는", "텅빈", "공허한", "쫓겨난"};
    String[] nick2 = new String[]{"자동차", "오렌지", "개발자", "사람", "나무", "들꽃", "라일락", "에어컨", "커튼", "오아시스", "이불",
            "마루", "강아지", "고양이", "주전자", "찻잔", "JAVA", "SQL", "PHYTHON", "AWS", "의자", "테이블",
            "웹툰", "스피커", "캔들", "머리핀", "자전거", "노트", "문방구", "학교", "용", "전설", "아파트",
            "빌라", "주식", "기린", "타조", "곰", "병아리", "경기도", "서울", "사자", "호랑이", "팬더",
            "회사원", "프리랜서", "직장인", "학생", "할머니", "할아버지", "어린이", "시계", "천재", "코트",
            "스마트폰", "휴대폰", "그립톡", "마우스", "USB", "HDMI", "화병", "튤립", "장미", "프리지아",
            "대리", "차장", "과장", "사원", "선임", "연구원", "가보자고", "알파벳", "쿠션", "테일러스위프트",
            "너바나", "건앤로즈", "터치드", "텀블러", "브리타", "코리아", "가담항설", "모네", "다빈치", "고갱",
            "박물관", "세잔", "나폴레옹", "마네", "드가", "피카소", "베토벤", "모차르트", "제프딘", "마가렛", "해밀턴",
            "리차드", "스톨먼", "앨런쿠퍼", "인텔리제이", "이클립스", "구트만스", "제임스고슬링", "자바", "라스킨",
            "고흐", "뭉크", "까르띠에", "예술", "코드", "컴파일", "폴더", "클래스", "인터페이스", "노엘갤러거",
            "리암갤러거", "샘스미스", "찰리푸스", "에드시런", "하플버", "펀", "케미컬로맨스", "클래식", "패키지",
            "엔티티", "서비스", "깃허브", "디티오", "컨트롤러", "그래들", "핑크", "선물", "노트북", "자격증",
            "원디렉션", "스타일스", "상상용", "아이언맨", "캡틴", "토르", "스타로드", "성길이", "아하", "호지어",
            "아델", "포스트말론", "비욘세", "퀸", "트로이시반", "시아", "마룬5", "미카", "팻앳디", "스위프트",
            "스위프티", "테일러", "아비치", "바스틸", "브루노마스", "제임스베이", "1975", "제시제이", "폴아보",
            "선생님", "포스터", "연인", "여행가", "몽상가", "호모사피엔스", "우산", "ORACLE", "JPA", "HTML",
            "JAVASCRIPT", "CSS", "MYBATIS", "스티커", "사또", "폐하", "공작", "백작", "남작", "자작", "후작",
            "영애", "소협", "대협", "짜장면", "짬뽕", "탕수육", "장군", "지휘관", "백수", "교주", "주교", "경찰",
            "마피아", "임포스터", "김치찌개", "짜글이", "곱창", "볶음밥", "주최자", "기부자", "한량", "스님"};

    // 회원가입
    @Override
    public MemberSignUpResponseDTO memberSignUp(MemberSignUpRequestDTO memberSignUpRequestDTO) {

        // 랜덤 숫자태그 주려고 만든 코드
        int authNo = (int) (Math.random() * (99999 - 10000 + 1)) + 10000;

        Member memberSignup = memberRepository.save(
                Member.builder()
                        .memberID(memberSignUpRequestDTO.getMemberID())
                        .memberName(memberSignUpRequestDTO.getMemberName())
                        .memberMail(memberSignUpRequestDTO.getMemberMail())
                        .memberPass(
                                BCrypt.hashpw(memberSignUpRequestDTO.getMemberPass(), BCrypt.gensalt()))
                        .memberPassHistory(
                                BCrypt.hashpw(memberSignUpRequestDTO.getMemberPass(), BCrypt.gensalt()))
                        .memberPhone(memberSignUpRequestDTO.getMemberPhone())
                        .memberAddress(memberSignUpRequestDTO.getMemberAddress())
                        .memberAddressDetail(memberSignUpRequestDTO.getMemberAddressDetail())
                        .memberZip(memberSignUpRequestDTO.getMemberZip())
                        .memberNickname(nick1[(int) (Math.random() * nick1.length)] + nick2[(int) (Math.random() * nick2.length)])
                        .memberRandom("#" + authNo)
                        .memberSocialType(SocialType.NORMAL)
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

    // 회원가입시 ID 중복검사
    // true == ID 사용 가능 , false == 사용 불가능(ID 존재)
    @Override
    public Boolean memberIdCheck(MemberIdCheckRequestDTO memberIdCheckRequestDTO) {
        Optional<String> idcheck = memberRepository.selectMemberID(memberIdCheckRequestDTO.getMemberID());
        if (idcheck.isEmpty()) {
            return true;
        } else {
            return false;
        }
    }

    // 일반 로그인
    @Override
    public Long memberLogin(MemberLoginRequestDTO memberLoginRequestDTO) {
        Optional<Member> login = memberRepository.selectMemberIDandPW(memberLoginRequestDTO.getMemberID());

        if (login.isEmpty()) {
            return null;
        } else {
            if (BCrypt.checkpw(memberLoginRequestDTO.getMemberPass(), login.get().getMemberPass())) {
                return login.get().getMemberNo();
            } else {
                return null;
            }
        }

    }

    // 일반 로그인 시 refreshToken 저장
    @Override
    public void memberNormalLoginRefreshToken(Long memberNo, String memberToken) {
        Member member = memberRepository.getReferenceById(memberNo);
        member.changeToken(memberToken);
    }

    // ID 찾기
    @Override
    public List<MemberIdFindResponseDTO> idFind(MemberIdFindRequestDTO memberIdFindRequestDTO) {
        List<Member> idfind = memberRepository.selectMemberByNameAndPhone(memberIdFindRequestDTO.getMemberName(),
                memberIdFindRequestDTO.getMemberPhone());

        List<MemberIdFindResponseDTO> findIdList = idfind.stream().map(this::listIdFind).toList();

        return findIdList;
    }

    // ID 찾기 - List 처리하기 때문에 위에서 Stream을 썼고, 아래 코드로 추가로 처리한다.
    public MemberIdFindResponseDTO listIdFind(Member member) {
        MemberIdFindResponseDTO memberIdFindResponseDTO = new MemberIdFindResponseDTO();

        memberIdFindResponseDTO.setMemberID(member.getMemberID());
        memberIdFindResponseDTO.setMemberNickName(member.getMemberNickname());
        memberIdFindResponseDTO.setMemberRandom(member.getMemberRandom());
        memberIdFindResponseDTO.setMemberDate(member.getMemberDate());

        return memberIdFindResponseDTO;
    }

    // PW 찾기
    @Override
    public String memberPwFind(MemberPwFindRequsetDTO memberPwFindRequsetDTO, String memberPass) {
        Optional<Member> pwfind = memberRepository.selectMemberMail(memberPwFindRequsetDTO.getMemberID(),
                memberPwFindRequsetDTO.getMemberName(),
                memberPwFindRequsetDTO.getMemberPhone());

        if (pwfind.isEmpty()) {
            return null;
        } else {
            // 유저의 비밀번호를 임시 비밀번호로 바꿔준다.
            pwfind.get().changePass(memberPass);
            return pwfind.get().getMemberMail();
        }
    }

    // memberInfo 조회
    @Override
    public MemberInfoResponseDTO memberInfo(Long memberNo) {
        Optional<Member> memberInfo = memberRepository.selectMemberInfo(memberNo);
        MemberInfoResponseDTO memberInfoResponseDTO = new MemberInfoResponseDTO();

        if (memberInfo.isEmpty()) {
            return null;
        } else {
            memberInfoResponseDTO.setMemberID(memberInfo.get().getMemberID());
            memberInfoResponseDTO.setMemberMail(memberInfo.get().getMemberMail());
            memberInfoResponseDTO.setMemberName(memberInfo.get().getMemberName());
            memberInfoResponseDTO.setMemberNickName(memberInfo.get().getMemberNickname());
            memberInfoResponseDTO.setMemberRandom(memberInfo.get().getMemberRandom());
            memberInfoResponseDTO.setMemberPhone(memberInfo.get().getMemberPhone());
            memberInfoResponseDTO.setMemberAddress(memberInfo.get().getMemberAddress());
            memberInfoResponseDTO.setMemberAddressDetail(memberInfo.get().getMemberAddressDetail());
            memberInfoResponseDTO.setMemberZip(memberInfo.get().getMemberZip());
            memberInfoResponseDTO.setMemberFile(memberInfo.get().getMemberFile());
            memberInfoResponseDTO.setMemberIntroduce(memberInfo.get().getMemberIntroduce());
            memberInfoResponseDTO.setMemberCreated(memberInfo.get().getMemberDate());
            memberInfoResponseDTO.setMemberLastLogin(memberInfo.get().getMemberLastLogin());

            return memberInfoResponseDTO;
        }
    }

    // 커뮤니티 내 프로필 수정
    @Override
    public MemberModifyResponseDTO memberModify(MemberModifyRequestDTO memberModifyRequestDTO, Long memberNo) {
        Member member = memberRepository.getReferenceById(memberNo);
        String memberFile = null;

        if (memberModifyRequestDTO.getMemberFile() != null) {
            memberFile = s3UploadService.upload(memberModifyRequestDTO.getMemberFile(), "deepProfile");
        }

        member.chageModify(memberModifyRequestDTO.getMemberNickName(),
                memberModifyRequestDTO.getMemberIntroduce(),
                memberFile);

        MemberModifyResponseDTO memberModifyResponseDTO = new MemberModifyResponseDTO();
        memberModifyResponseDTO.setMessage("Success");

        return memberModifyResponseDTO;

    }

    // 개인 프로필 편집 - 비밀번호 변경
    @Override
    public MemberModifyPassResponseDTO memberModifyPass(MemberModifyPassRequestDTO memberModifyPassRequestDTO, Long memberNo) {
        Member member = memberRepository.getReferenceById(memberNo);
        String isPassOk = member.getMemberPassHistory();

        log.info("before password is {}", isPassOk);
        log.info("change password is {}", member);

        // 비밀번호 같으면 false
        if (BCrypt.checkpw(memberModifyPassRequestDTO.getMemberPass(), isPassOk)) {
            return null;
        } else {
            member.memberUpdatePW(memberModifyPassRequestDTO.getMemberPass());
            MemberModifyPassResponseDTO memberModifyPassResponseDTO = new MemberModifyPassResponseDTO();

            memberModifyPassResponseDTO.setMessage("Success");
            return memberModifyPassResponseDTO;
        }
    }

    // 개인 프로필 편집 - 메일 변경
    @Override
    public MemberModifyMailResponseDTO memberModifyMail(MemberModifyMailRequestDTO memberModifyMailRequestDTO, Long memberNo) {
        Member member = memberRepository.getReferenceById(memberNo);

        member.memberUpdateMail(memberModifyMailRequestDTO.getMemberMail());
        MemberModifyMailResponseDTO memberModifyMailResponseDTO = new MemberModifyMailResponseDTO();
        memberModifyMailResponseDTO.setMessage("Success");
        return memberModifyMailResponseDTO;
    }

    // 개인 프로필 편집 - 주소 변경
    @Override
    public MemberModifyAddressResponseDTO memberModifyAddress(MemberModifyAddressRequestDTO memberModifyAddressRequestDTO, Long memberNo) {
        Member member = memberRepository.getReferenceById(memberNo);

        member.memberUpdateAddress(
                memberModifyAddressRequestDTO.getMemberAddress(),
                memberModifyAddressRequestDTO.getMemberAddressDetail(),
                memberModifyAddressRequestDTO.getMemberZip());

        MemberModifyAddressResponseDTO memberModifyAddressResponseDTO = new MemberModifyAddressResponseDTO();
        memberModifyAddressResponseDTO.setMessage("Success");

        return memberModifyAddressResponseDTO;
    }

    // 개인 프로필 편집 - 휴대폰 번호 변경
    @Override
    public MemberModifyPhoneResponseDTO memberModifyPhone(MemberModifyPhoneRequestDTO memberModifyPhone, Long memberNo) {
        Member member = memberRepository.getReferenceById(memberNo);

        member.memberUpdatePhone(memberModifyPhone.getMemberPhone());

        MemberModifyPhoneResponseDTO memberModifyPhoneResponseDTO = new MemberModifyPhoneResponseDTO();
        memberModifyPhoneResponseDTO.setMessage("Success");

        return memberModifyPhoneResponseDTO;
    }

    // 회원 탈퇴
    @Override
    public MemberDeleteResponseDTO memberDelete(Long memberNo) {
        memberRepository.deleteMember(memberNo);

        MemberDeleteResponseDTO memberDeleteResponseDTO = new MemberDeleteResponseDTO();
        memberDeleteResponseDTO.setMessage("Success");

        return memberDeleteResponseDTO;
    }

    // Refresh Token과 ID가 같은지 확인하기
    // 아무것도 없다면? null로 받겠다 > id와 token 둘 중 하나라도 다르면 null 처리한다.
    @Override
    public Long isRefreshTokenAndIdOk(SendTokenRequestDTO sendTokenRequestDTO) {
        Long isOk = memberRepository.memberRefreshTokenAndID(
                sendTokenRequestDTO.getMemberID()
                , sendTokenRequestDTO.getMemberToken()).orElse(null);

        return isOk;
    }

    // 멤버(유저) 검색
    @Override
    public List<MemberSearchResponseDTO> searchMember(MemberSearchRequestDTO memberSearchRequestDTO) {
        return memberRepository.selectMemberByNickNameAndRandom(
                memberSearchRequestDTO.getMemberNickName(),
                memberSearchRequestDTO.getMemberRandom()
        );
    }

    // 다른 유저의 프로필 보기
    @Override
    public MemberOthersProfileResponseDTO othersProfile(MemberOthersProfileRequestDTO memberOthersProfileRequestDTO) {
        Optional<Member> member = memberRepository.selectOtherMemberNickNameAndRandom(
                memberOthersProfileRequestDTO.getMemberNickName(),
                memberOthersProfileRequestDTO.getMemberRandom());

        if (member.isEmpty()) {
            return null;
        } else {
            MemberOthersProfileResponseDTO memberOthersProfileResponseDTO = new MemberOthersProfileResponseDTO();
            memberOthersProfileResponseDTO.setMemberNickName(member.get().getMemberNickname());
            memberOthersProfileResponseDTO.setMemberRandom(member.get().getMemberRandom());
            memberOthersProfileResponseDTO.setMemberFile(member.get().getMemberFile());
            memberOthersProfileResponseDTO.setMemberIntroduce(member.get().getMemberIntroduce());
            return memberOthersProfileResponseDTO;
        }
    }

    // [커뮤니티 프로필] 마이 페이지 - 내가 쓴 글 확인
    @Override
    public List<MemberProfilePostResponseDTO> myPost(Long memberNo) {
        List<MemberProfilePostResponseDTO> memberProfilePost = memberRepository.selectMemberPost(memberNo);
        memberProfilePost = memberProfilePost.stream().map(this::profilePost).toList();

        return memberProfilePost;
    }

    // [커뮤니티 프로필] 마이 페이지 - 내가 쓴 글 확인 이어서
    public MemberProfilePostResponseDTO profilePost(MemberProfilePostResponseDTO memberProfilePostResponseDTO) {
        memberProfilePostResponseDTO.setLike(boardLikeRepository.selectBoardDetailLikeCount(memberProfilePostResponseDTO.getBoardNo()));
        memberProfilePostResponseDTO.setReply(replyRepository.selectReplyCount(memberProfilePostResponseDTO.getBoardNo()));

        return memberProfilePostResponseDTO;
    }

    // [커뮤니티 프로필] 마이 페이지 - 내가 쓴 댓글 확인
    @Override
    public List<MemberProfileReplyResponseDTO> myReply(Long memberNo) {
        Member member = memberRepository.getReferenceById(memberNo);
        List<MemberProfileReplyResponseDTO> memberProfileReplyResponseDTO = memberRepository.selectMemberReply(member.getMemberNickname(), member.getMemberRandom());

        return memberProfileReplyResponseDTO;
    }

    // [커뮤니티 프로필] 마이 페이지 - 내가 누른 좋아요 확인
    @Override
    public List<MemberProfieLikeResponseDTO> myLike(Long memberNo) {
        List<MemberProfieLikeResponseDTO> memberProfileLike = memberRepository.selectMemberLike(memberNo);
        memberProfileLike = memberProfileLike.stream().map(this::profileLike).toList();

        return memberProfileLike;
    }


    // [커뮤니티 프로필] 마이 페이지 - 내가 누른 좋아요 확인 이어서
    public MemberProfieLikeResponseDTO profileLike(MemberProfieLikeResponseDTO memberProfieLikeResponseDTO) {
        memberProfieLikeResponseDTO.setLike(boardLikeRepository.selectBoardDetailLikeCount(memberProfieLikeResponseDTO.getBoardNo()));
        memberProfieLikeResponseDTO.setReply(replyRepository.selectReplyCount(memberProfieLikeResponseDTO.getBoardNo()));

        return memberProfieLikeResponseDTO;
    }

    // [다른 사람의 마이 페이지] - 해당 유저가 작성한 글 확인
    @Override
    public List<MemberOthersPostResponseDTO> othersPost(String memberNickName, String memberRandom) {
        List<MemberOthersPostResponseDTO> otherMemberPost = memberRepository.selectOtherMemberPost(memberNickName, memberRandom);
        otherMemberPost = otherMemberPost.stream().map(this::othersWritePost).toList();

        return otherMemberPost;
    }

    // [다른 사람의 마이 페이지] - 해당 유저가 작성한 글 이어서
    public MemberOthersPostResponseDTO othersWritePost(MemberOthersPostResponseDTO memberOthersPostResponseDTO) {
        memberOthersPostResponseDTO.setLike(boardLikeRepository.selectBoardDetailLikeCount(memberOthersPostResponseDTO.getBoardNo()));
        memberOthersPostResponseDTO.setReply(replyRepository.selectReplyCount(memberOthersPostResponseDTO.getBoardNo()));

        return memberOthersPostResponseDTO;
    }

    // [다른 사람의 마이 페이지] - 해당 유저가 작성한 댓글 확인
    @Override
    public List<MemberOthersReplyResponseDTO> othersReply(String memberNickName, String memberRandom) {
        List<MemberOthersReplyResponseDTO> memberOthersReplyResponseDTO = memberRepository.selectOtherMemberReply(memberNickName, memberRandom);

        return memberOthersReplyResponseDTO;
    }
}
