package com.basic.deep.board.service;

import com.basic.deep.board.dto.BoardWriteRequestDTO;
import com.basic.deep.board.dto.BoardWriteResponseDTO;
import com.basic.deep.board.entity.Board;
import com.basic.deep.board.entity.BoardImg;
import com.basic.deep.board.entity.BoardTag;
import com.basic.deep.board.repository.BoardRepository;
import com.basic.deep.board.repository.ImgRepository;
import com.basic.deep.board.repository.TagRepository;
import com.basic.deep.member.entity.Member;
import com.basic.deep.member.repository.MemberRepository;
import com.basic.deep.member.service.S3UploadService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;

@Service
@Transactional
public class BoardServiceImpl implements BoardService {

    @Autowired
    private BoardRepository boardRepository;

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private TagRepository tagRepository;

    @Autowired
    private ImgRepository imgRepository;

    @Autowired
    private S3UploadService s3UploadService;

    // 게시글 작성
    @Override
    public BoardWriteResponseDTO boardWrite(BoardWriteRequestDTO boardWriteRequestDTO, Long memberNo) {
        Member member = memberRepository.getReferenceById(memberNo);
        Board boardWrite = boardRepository.save(
                Board.builder()
                        .boardTitle(boardWriteRequestDTO.getTitle())
                        .boardCategory(boardWriteRequestDTO.getCategory())
                        .boardContent(boardWriteRequestDTO.getContent())
                        .boardDate(LocalDateTime.now())
                        .member_no(member)
                        .boardReadCount(0)
                        .build()
        );

        for (String o : boardWriteRequestDTO.getTag()) {
            BoardTag boardWriteTag = tagRepository.save(
                    BoardTag.builder()
                            .tagName(o)
                            .boardNo(boardWrite)
                            .build()
            );
        }

        for (MultipartFile o : boardWriteRequestDTO.getImg()) {
            String boardImgUrl = s3UploadService.upload(o, "deepBoardImg");
            BoardImg boardWriteImg = imgRepository.save(
                    BoardImg.builder()
                            .imgFile(boardImgUrl)
                            .boardNo(boardWrite)
                            .build()
            );
        }

        BoardWriteResponseDTO boardWriteResponseDTO = new BoardWriteResponseDTO();
        boardWriteResponseDTO.setBoardNo(boardWrite.getBoardNo());
        boardWriteResponseDTO.setMemberNickName(member.getMemberNickname());
        boardWriteResponseDTO.setMemberRandom(member.getMemberRandom());
        boardWriteResponseDTO.setBoardCreatedTime(boardWrite.getBoardDate());

        return boardWriteResponseDTO;
    }
}
