package com.basic.deep.member.service;

import com.basic.deep.member.dto.*;
import com.basic.deep.member.entity.AddFriends;
import com.basic.deep.member.entity.Member;
import com.basic.deep.member.repository.AddFriendsRepository;
import com.basic.deep.member.repository.MemberRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
@Transactional
public class AddFriendsServiceImpl implements AddFriendsService{

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private AddFriendsRepository addFriendsRepository;

    // 친구 추가
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

    // 프로필 - 나 > 타인 -> 팔로잉 목록 보기
    @Override
    public List<AddFriendsListResponseDTO> addFriendsList(AddFriendsListRequestDTO addFriendsListRequestDTO) {
        Member selectMemberNo = memberRepository.selectMemberNickAndRandom(
                addFriendsListRequestDTO.getMemberNickName(),
                addFriendsListRequestDTO.getMemberRandom()
        ).orElse(null);

        if (selectMemberNo == null){
            return null;
        }else{
            // 리스트로 받아서 return 한다. inline 변경하면 변수만들어서 return한게 한 줄로 축약되지만
            // 이해가 되기 쉽게 이렇게 풀어서 썼다.
            List<AddFriendsListResponseDTO> addFriendsList = addFriendsRepository.selectAddFriendsList(selectMemberNo);
            return addFriendsList;
        }
    }
}
