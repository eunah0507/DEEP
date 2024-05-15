package com.basic.deep.board.service;

import com.basic.deep.board.dto.*;
import com.basic.deep.board.entity.Board;
import com.basic.deep.board.entity.BoardReply;
import com.basic.deep.board.repository.BoardRepository;
import com.basic.deep.board.repository.ReplyRepository;
import com.basic.deep.member.entity.Member;
import com.basic.deep.member.repository.MemberRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@Transactional
public class ReplyServiceImpl implements ReplyService {

    @Autowired
    private BoardRepository boardRepository;

    @Autowired
    private ReplyRepository replyRepository;

    @Autowired
    private MemberRepository memberRepository;


    // 댓글 작성
    @Override
    public ReplyWriteResponseDTO replyWrite(ReplyWriteRequestDTO replyWriteRequestDTO, Long memberNo) {
        Member member = memberRepository.getReferenceById(memberNo);
        Board board = boardRepository.getReferenceById(replyWriteRequestDTO.getBoardNo());
        BoardReply replyWrite;

        if (replyWriteRequestDTO.getParentNo() == null || replyWriteRequestDTO.getParentNo() == 0) {
            replyWrite = replyRepository.save(
                    BoardReply.builder()
                            .boardNo(board)
                            .replyContent(replyWriteRequestDTO.getReplyContent())
                            .replyNickName(member.getMemberNickname())
                            .replyRandom(member.getMemberRandom())
                            .replyDate(LocalDateTime.now())
                            .build()
            );
        } else {
            BoardReply boardReply = replyRepository.getReferenceById(replyWriteRequestDTO.getParentNo());

            replyWrite = replyRepository.save(
                    BoardReply.builder()
                            .boardNo(board)
                            .parentNo(boardReply)
                            .replyContent(replyWriteRequestDTO.getReplyContent())
                            .replyNickName(member.getMemberNickname())
                            .replyRandom(member.getMemberRandom())
                            .replyDate(LocalDateTime.now())
                            .build()
            );
        }

        ReplyWriteResponseDTO replyWriteResponseDTO = new ReplyWriteResponseDTO();
        replyWriteResponseDTO.setMemberNickName(replyWrite.getReplyNickName());
        replyWriteResponseDTO.setMemberRandom(replyWrite.getReplyRandom());
        replyWriteResponseDTO.setReplyCreatedTime(replyWrite.getReplyDate());
        replyWriteResponseDTO.setReplyNo(replyWrite.getReplyNo());

        return replyWriteResponseDTO;
    }

    // 댓글 수정
    @Override
    public ReplyModifyResponseDTO replyModify(ReplyModifyRequestDTO replyModifyRequestDTO, Long memberNo) {
        // boardreply가 맞는지 물어보기
        BoardReply boardReply = replyRepository.getReferenceById(replyModifyRequestDTO.getReplyNo());
        Member member = memberRepository.getReferenceById(memberNo);

        // 댓글 작성한 사람의 닉네임과 memberNo로 뽑아온 memberNickname 또는
        // 댓글 작성한 사람의 랜덤태그와 memberNo로 뽑아온 memberRandom을 비교해서 다르면 null을 return한다.
        // 더 좋은 코드로 replace 가능하지만, 내가 못알아보니까 이대로 둔다.
        if (!boardReply.getReplyNickName().equals(member.getMemberNickname()) || !boardReply.getReplyRandom().equals(member.getMemberRandom())) {
            return null;
        }

        // 댓글을 수정한다. entity에서 수정한 코드를 받아온다.
        boardReply.modifyReply(replyModifyRequestDTO.getReplyContent());

        // responseDTO에 담아준다.
        ReplyModifyResponseDTO replyModifyResponseDTO = new ReplyModifyResponseDTO();
        replyModifyResponseDTO.setMemberNickName(boardReply.getReplyNickName());
        replyModifyResponseDTO.setMemberRandom(boardReply.getReplyRandom());
        replyModifyResponseDTO.setReplyUpdateTim(boardReply.getReplyModifyDate());
        replyModifyResponseDTO.setReplyCreatedTime(boardReply.getReplyDate());

        return replyModifyResponseDTO;
    }

    // 댓글 삭제
    @Override
    public ReplyDeleteResponseDTO replyDelete(ReplyDeleteRequestDTO replyDeleteRequestDTO, Long memberNo) {
        BoardReply boardReply = replyRepository.getReferenceById(replyDeleteRequestDTO.getReplyNo());
        Member member = memberRepository.getReferenceById(memberNo);

        if (!boardReply.getReplyNickName().equals(member.getMemberNickname()) || !boardReply.getReplyRandom().equals(member.getMemberRandom())) {
            return null;
        }

        replyRepository.deleteReply(boardReply.getReplyNo());
        ReplyDeleteResponseDTO replyDeleteResponseDTO = new ReplyDeleteResponseDTO();
        replyDeleteResponseDTO.setMessage("Success");

        return replyDeleteResponseDTO;
    }

    // 게시글 1개 상세 조회 > 댓글 전체 조회
    @Override
    public List<ReplyDetailResponseDTO> replyDatail(ReplyDetailRequestDTO replyDetailRequestDTO) {
        // List라서 return으로 시작한다.
        // replyRepository에서 boardRepository를 받아온다.
        return replyRepository.findAllReplyDetail(boardRepository.getReferenceById(replyDetailRequestDTO.getBoardNo()));
    }
}