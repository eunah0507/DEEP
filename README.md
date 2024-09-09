# 개발자 커뮤니티 DEEP
#### (Developer + Engineer + Programmer)

![image](https://github.com/user-attachments/assets/92ea267a-2dc5-473f-950c-b3c1cd9957fe)

<br>

### < 기획 의도 >
* 현대인들은 휴대폰 이용 시간이 늘어나고 있으며, 커뮤니티 이용 수도 증가하고 있음
* MZ세대는 70% 이상이 온라인 커뮤니티 이용(출처: 대학 내일 20대 연구소)
* 2022년도 커뮤니티 이용자 통계를 살펴 보면, 한 달 동안 커뮤니티에 접속했다고
  알린 사람은 49.9%임을 알 수 있음 (출처 : 국가통계포털)
* 커뮤니티를 가장 많이 이용하며 취업 활동을 시작했거나,
  사회 생활을 시작한 개발자들에게 커뮤니티 제공
* 또한 개발과 관련된 진로를 희망하는 10대와
  시니어 개발자들에게도 관련 커뮤니티를 제공
  * 출처 : https://www.20slab.org/Archives/37890
 
<br>

 ### < 서비스 소개 >
 * 회원 가입 및 로그인 기능
 * 마이 페이지 및 친구(팔로워 및 팔로우) 기능
 * 게시판 서비스(공지, 인기글, 기술, QnA, 자유)
 * 알림 기능(좋아요, 댓글 등)

<br>

### < 팀원 구성 및 프로젝트 기간 >
* 기간 : 2024.07.02 ~ 2024.08.28
* 팀원 구성
  
  |정은아|임혜연|김보민|
  |:---:|:---:|:---:|
  |팀장, BE|BE|FE|
  
<br>

### < 기술 스택 >
#### ✔️Frond-end
        * Library : React
        * Styling : styled-components
        * Data Fetching : axios
        * State Management : redux js toolkit
        * State Form : React Hook Form

#### ✔️Back-end
        * Framework : Spring
        * Library : SpringBoot, Lombok, Spring Web, Validation, Spring Security, jwt, Oauth2.0, jbcrypt, AWS
        * Databse : MySql
        * Language : Java 17 

### < 아키텍쳐 >
![image](https://github.com/user-attachments/assets/8bfe972d-7210-4deb-83ae-99e877f933c4)

<br>
<br>

## < 메인 기능 소개> 

### 1-1. 회원 서비스 - 회원 가입 및 로그인

<p align="center">
  <img src="https://github.com/user-attachments/assets/9a6dcbac-fba2-4da6-8ba3-0a1ecc44698b" width="50%" />
  <img src="https://github.com/user-attachments/assets/3454322c-f049-4053-8f32-a58b169172e9" width="40%" />
</p>

  * 일반 로그인 및 소셜 로그인(kakao, naver, google) 가능
  * 로그인 기능의 경우 JWT 기반 Refresh Token, Access Token 사용

<br>
<br>

### 1-2. ID 찾기

<p align="center">
  <img src="https://github.com/user-attachments/assets/5d74e3a4-f6b3-44fc-9d77-d2f2046dc867" width="40%" />
  <img src="https://github.com/user-attachments/assets/bbef637f-977f-4650-a7e2-6d6b2c31bc35" width="50%" />
</p>

  * ID 찾기 시 DB에 값 존재 한다면, 화면에 결과 값 노출

<br>
<br>

### 1-3. PW 찾기

<p align="center">
  <img src="https://github.com/user-attachments/assets/8056b98d-3759-4ee2-afb9-d64c38ffec1b" width="35%" />
  <img src="https://github.com/user-attachments/assets/76c3144a-08a8-421b-b199-b0fef5289a0b" width="55%" />
</p>

  * PW 찾기 시 DB에 값 존재 한다면, 회원 가입 시 등록한 메일로 임시 비밀번호 전송

<br>
<br>

### 1-4. 마이 페이지

<p align="center">
  <img src="https://github.com/user-attachments/assets/14a1a23c-d112-4eea-9525-472f4645f8bd" width="45%" />
  <img src="https://github.com/user-attachments/assets/382442a2-39ed-4359-87fc-9d251275558a" width="45%" />
</p>

  * 닉네임 및 프로필 이미지 편집 가능
  * 본인이 작성한 글, 댓글, 좋아요 확인 기능
  * 팔로우 및 팔로워 기능

<br>
<br>

### 2. 게시판 서비스

![image](https://github.com/user-attachments/assets/3c2a5837-43f0-4086-8db0-ea3649dc16cf)

<br>
<br>

### 2-1. 게시글 작성

![image](https://github.com/user-attachments/assets/2b19118d-42c1-4a15-b2f6-2cb0283e6b02)

  * 카테고리 별 게시판 제공(QnA, 기술, 공지, 자유)
  * 게시판 별 글 조회, 작성, 수정, 삭제 가능
  * 글 작성 시 사진 다중 업로드 및 태그 작성 가능

<br>
<br>

### 2-1. 게시판 글 조회 시

<p align="center">
  <img src="https://github.com/user-attachments/assets/014d0abb-631d-4acb-b1a2-c4963b1a689e" width="45%" />
  <img src="https://github.com/user-attachments/assets/d1dd827a-4e36-4c8f-8e0a-5cde33ba6ae5" width="45%" />
</p>

  * 댓글 및 대댓글 작성
  * 글 추천(좋아요) 가능 → 추천 수 10 이상 시 인기글 게시판 조회 가능
    * 게시글의 경우 한 ID당 좋아요 한 번 누를 수 있음
  * 태그, 게시물 제목, 내용, 닉네임으로 검색 기능
<br>
<br>

### 3. 알림 서비스

<img src="https://github.com/user-attachments/assets/ad9e0cdf-da34-4e64-aefe-1d3cc39bfa8e" width="400" />

  * 사용자가 작성한 글에 좋아요 및 댓글, 대댓글이 달렸을 경우
  * 사용자가 신고 당해서 영구 정지 처리 되었을 경우(미완료)
<br>
<br>

## <ERD 다이어그램>

![image](https://github.com/user-attachments/assets/a8a2f0db-c8e1-4f4b-8695-ef834bb50bce)








