package com.basic.deep.member.service;

import com.basic.deep.member.dto.*;
import com.basic.deep.member.entity.MyFollower;
import com.basic.deep.member.entity.Member;
import com.basic.deep.member.repository.MyFollowerRepository;
import com.basic.deep.member.repository.MemberRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class MyFollowerServiceImpl implements MyFollowerService {

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private MyFollowerRepository myFollowerRepository;

    @Override
    public FollowingResponseDTO followingOtherUsers(FollowingRequestDTO followingRequestDTO, Long memberNo) {
       Member member = memberRepository.getReferenceById(memberNo);
       Member selectInfo = memberRepository.selectMemberNickAndRandom(
               followingRequestDTO.getMemberNickName(),
               followingRequestDTO.getMemberRandom()).orElse(null);

       if (selectInfo != null){
           myFollowerRepository.save(
                   MyFollower.builder()
                           .myFollowerNo(member)
                           .memberNo(selectInfo)
                           .build()
           );


           FollowingResponseDTO followingResponseDTO = new FollowingResponseDTO();
           followingResponseDTO.setMessage("Success");

           return followingResponseDTO;
       }else{
           return null;
       }
    }


    // 친구 삭제 (unfollowing)
    @Override
    public UnFollowingResponseDTO unfollowingOtherUsers(UnFollowingRequestDTO unFollowingRequestDTO, Long memberNo) {
        Member member = memberRepository.getReferenceById(memberNo);
        Member selectInfo = memberRepository.selectMemberNickAndRandom(
                unFollowingRequestDTO.getMemberNickName(),
                unFollowingRequestDTO.getMemberRandom()).orElse(null);

        myFollowerRepository.deleteFriends(member, selectInfo);

        UnFollowingResponseDTO unFollowingResponseDTO = new UnFollowingResponseDTO();
        unFollowingResponseDTO.setMessage("Success");

        return unFollowingResponseDTO;
    }

    // 프로필 - 타인 > 나 -> 팔로워 목록 보기
    @Override
    public List<MyFollowerListResponseDTO> myFollowerList(MyFollowerListRequestDTO myFollowerListRequestDTO) {
         Member selectMemberNo = memberRepository.selectMemberNickAndRandom(
                myFollowerListRequestDTO.getMemberNickName(),
                myFollowerListRequestDTO.getMemberRandom()
        ).orElse(null);

        if (selectMemberNo == null){
            return null;
        }else{
            // 리스트로 받아서 return 한다. inline 변경하면 변수만들어서 return한게 한 줄로 축약되지만
            // 이해가 되기 쉽게 이렇게 풀어서 썼다.
           List<MyFollowerListResponseDTO> myFollowerList = myFollowerRepository.selectMyFollowerList(selectMemberNo);
           return myFollowerList;
        }
    }
}
