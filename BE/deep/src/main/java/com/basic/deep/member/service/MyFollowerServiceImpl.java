package com.basic.deep.member.service;

import com.basic.deep.member.dto.FollowingRequestDTO;
import com.basic.deep.member.dto.FollowingResponseDTO;
import com.basic.deep.member.dto.UnFollowingRequestDTO;
import com.basic.deep.member.dto.UnFollowingResponseDTO;
import com.basic.deep.member.entity.MyFollower;
import com.basic.deep.member.entity.Member;
import com.basic.deep.member.repository.MyFollowerRepository;
import com.basic.deep.member.repository.MemberRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
}
