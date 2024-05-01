package com.basic.deep.member.service;

import com.basic.deep.member.dto.FollowingRequestDTO;
import com.basic.deep.member.dto.FollowingResponseDTO;
import com.basic.deep.member.dto.UnFollowingRequestDTO;
import com.basic.deep.member.dto.UnFollowingResponseDTO;
import com.basic.deep.member.entity.AddFriends;
import com.basic.deep.member.entity.Member;
import com.basic.deep.member.repository.AddFriendsRepository;
import com.basic.deep.member.repository.MemberRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
@Transactional
public class AddFriendsServiceImpl implements AddFriendsService{

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private AddFriendsRepository addFriendsRepository;

    @Override
    public FollowingResponseDTO followingOtherUsers(FollowingRequestDTO followingRequestDTO, Long memberNo) {
        Member member = memberRepository.getReferenceById(memberNo);
        Member selectAllInfo = memberRepository.selectMemberNickAndRandom(
                followingRequestDTO.getMemberNickName(),
                followingRequestDTO.getMemberRandom()).orElse(null);

        if (selectAllInfo != null) {
            addFriendsRepository.save(
                    AddFriends.builder()
                            .addFriendNo(selectAllInfo)
                            .memberNo(member)
                            .build()
            );

            FollowingResponseDTO followingResponseDTO = new FollowingResponseDTO();
            followingResponseDTO.setMessage("Success");

            return followingResponseDTO;
        }else{
            return null;
        }
    }

    // 친구 삭제(unfollowing)
    @Override
    public UnFollowingResponseDTO unFollowingOtherUsers(UnFollowingRequestDTO unFollowingRequestDTO, Long memberNo) {
        Member member = memberRepository.getReferenceById(memberNo);
        Member selectInfo = memberRepository.selectMemberNickAndRandom(
                unFollowingRequestDTO.getMemberNickName(),
                unFollowingRequestDTO.getMemberRandom()).orElse(null);

        addFriendsRepository.deleteFriends(member, selectInfo);

        UnFollowingResponseDTO unFollowingResponseDTO = new UnFollowingResponseDTO();
        unFollowingResponseDTO.setMessage("Success");

        return unFollowingResponseDTO;
    }
}
