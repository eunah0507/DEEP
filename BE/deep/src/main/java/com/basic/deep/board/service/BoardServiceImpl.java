package com.basic.deep.board.service;

import com.basic.deep.board.dto.*;
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

    // 게시글 수정
    @Override
    public BoardModifyResponseDTO boardModify(BoardModifyRequestDTO boardModifyRequestDTO, Long memberNo) {
        Board board = boardRepository.getReferenceById(boardModifyRequestDTO.getBoardNo());
        Member member = memberRepository.getReferenceById(memberNo);

        // 게시판 글쓴이랑 member랑 비교해서 다른 사람이면 잘못된 접근이므로 null을 return한다.
        // 더 좋은 코드로 replace 가능하지만 내가 해석 못하니까 그냥 이대로 둔다 ^^
        // 더 좋은 코드 = !Objects.equals(board.getMember_no().getMemberNo(), memberNo)
        if (board.getMember_no().getMemberNo() != memberNo){
            return null;
        }

        // 게시글 수정한다. entity에서 수정한 걸 그대로 가져온다.
        board.modifyBoard(boardModifyRequestDTO.getTitle(),
                boardModifyRequestDTO.getCategory(),
                boardModifyRequestDTO.getContent());

        // 수정이 끝났으니, 이미지와 해시태그를 삭제한다.
        imgRepository.deleteBoard(board);
        tagRepository.deleteBoard(board);

        // 삭제 끝났으니 다시 삽입한다.
        for (String o : boardModifyRequestDTO.getTag()) {
            BoardTag boardWriteTag = tagRepository.save(
                    BoardTag.builder()
                            .tagName(o)
                            .boardNo(board)
                            .build()
            );
        }

        for (MultipartFile o : boardModifyRequestDTO.getImg()) {
            String boardImgUrl = s3UploadService.upload(o, "deepBoardImg");
            BoardImg boardWriteImg = imgRepository.save(
                    BoardImg.builder()
                            .imgFile(boardImgUrl)
                            .boardNo(board)
                            .build()
            );
        }

        BoardModifyResponseDTO boardModifyResponseDTO = new BoardModifyResponseDTO();
        boardModifyResponseDTO.setBoardNo(board.getBoardNo());
        boardModifyResponseDTO.setMemberNickName(member.getMemberNickname());
        boardModifyResponseDTO.setMemberRandom(member.getMemberRandom());
        boardModifyResponseDTO.setBoardCreatedTime(board.getBoardDate());
        boardModifyResponseDTO.setBoardUpdatedTime(board.getBoardModifyDate());

        return boardModifyResponseDTO;
    }

    // 게시글 삭제
    @Override
    public BoardDeleteResponseDTO boardDelete(BoardDeleteRequestDTO boardDeleteRequestDTO, Long memberNo) {
        Board board = boardRepository.getReferenceById(boardDeleteRequestDTO.getBoardNo());
        Member member = memberRepository.getReferenceById(memberNo);

        // 게시판 글쓴이랑 member랑 비교해서 다른 사람이면 잘못된 접근이므로 null을 return한다.
        // 더 좋은 코드로 replace 가능하지만 내가 해석 못하니까 그냥 이대로 둔다 ^^
        // 더 좋은 코드 = !Objects.equals(board.getMember_no().getMemberNo(), memberNo)
        if (board.getMember_no().getMemberNo() != memberNo){
            return null;
        }

        // 삭제는 하위 테이블 먼저 삭제한다. 마지막으로 상위테이블을 삭제해야한다.
        imgRepository.deleteBoard(board);
        tagRepository.deleteBoard(board);
        boardRepository.deleteBoard(board.getBoardNo());

        BoardDeleteResponseDTO boardDeleteResponseDTO = new BoardDeleteResponseDTO();
        boardDeleteResponseDTO.setMessage("Success");

        return boardDeleteResponseDTO;
    }

    // 게시글 1개 상세 조회
//    @Override
//    public BoardDetailResponseDTO boardDetail(BoardDetailRequestDTO boardDetailRequestDTO) {
//        return null;
//    }
}
