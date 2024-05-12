package com.basic.deep.board.controller;


import com.basic.deep.board.dto.*;
import com.basic.deep.board.service.BoardService;
import com.basic.deep.board.service.ImgService;
import com.basic.deep.board.service.ReplyService;
import com.basic.deep.board.service.TagService;
import com.basic.deep.member.service.MemberService;
import com.basic.deep.member.service.S3UploadService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@CrossOrigin("*")
@RequestMapping("/board")
public class BoardController {

    @Autowired
    private BoardService boardService;

    @Autowired
    private TagService tagService;

    @Autowired
    private ImgService imgService;

    @Autowired
    private MemberService memberService;

    @Autowired
    private S3UploadService s3UploadService;

    @Autowired
    private ReplyService replyService;

    // 게시글 작성
    @PostMapping("/write")
    public ResponseEntity<?> write(@ModelAttribute BoardWriteRequestDTO boardWriteRequestDTO) {
        Long memberNo = Long.parseLong(SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString());
        BoardWriteResponseDTO boardWriteResponseDTO = boardService.boardWrite(boardWriteRequestDTO, memberNo);

        return new ResponseEntity<>(boardWriteResponseDTO, HttpStatus.OK);
    }

    // 게시글 수정
    @PutMapping("/modify")
    public ResponseEntity<?> modify(@ModelAttribute BoardModifyRequestDTO boardModifyRequestDTO) {
        Long memberNo = Long.parseLong(SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString());
        BoardModifyResponseDTO boardModifyResponseDTO = boardService.boardModify(boardModifyRequestDTO, memberNo);

        if (boardModifyResponseDTO == null) {
            return new ResponseEntity<>("잘못된 접근입니다. 수정할 수 없습니다.", HttpStatus.BAD_REQUEST);
        } else {
            return new ResponseEntity<>(boardModifyResponseDTO, HttpStatus.OK);
        }
    }

    // 게시글 삭제
    @DeleteMapping("/delete")
    public ResponseEntity<?> delete(@ModelAttribute BoardDeleteRequestDTO boardDeleteRequestDTO) {
        Long memberNo = Long.parseLong(SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString());

        BoardDeleteResponseDTO boardDeleteResponseDTO = boardService.boardDelete(boardDeleteRequestDTO, memberNo);

        if (boardDeleteResponseDTO == null) {
            return new ResponseEntity<>("잘못된 접근입니다. 삭제할 수 없습니다.", HttpStatus.BAD_REQUEST);
        } else {
            return new ResponseEntity<>(boardDeleteResponseDTO, HttpStatus.OK);
        }
    }

    // 댓글 작성
    @PostMapping("reply-write")
    public ResponseEntity<?> replyWrite(@RequestBody ReplyWriteRequestDTO replyWriteRequestDTO) {
        Long memberNo = Long.parseLong(SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString());

        ReplyWriteResponseDTO replyWriteResponseDTO = replyService.replyWrite(replyWriteRequestDTO, memberNo);
        return new ResponseEntity<>(replyWriteResponseDTO, HttpStatus.OK);
    }

    // 댓글 수정
    @PutMapping("/reply-modify")
    public ResponseEntity<?> replyModify(@RequestBody ReplyModifyRequestDTO replyModifyRequestDTO) {
        Long memberNo = Long.parseLong(SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString());
        ReplyModifyResponseDTO replyModifyResponseDTO = replyService.replyModify(replyModifyRequestDTO, memberNo);

        if (replyModifyResponseDTO == null) {
            return new ResponseEntity<>("잘못된 접근입니다. 댓글을 수정할 수 없습니다.", HttpStatus.BAD_REQUEST);
        } else {
            return new ResponseEntity<>(replyModifyResponseDTO, HttpStatus.OK);
        }
    }

    // 댓글 삭제
    @DeleteMapping("reply-delete")
    public ResponseEntity<?> replyDelete(@ModelAttribute ReplyDeleteRequestDTO replyDeleteRequestDTO){
        Long memberNo = Long.parseLong(SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString());

        ReplyDeleteResponseDTO replyDeleteResponseDTO = replyService.replyDelete(replyDeleteRequestDTO, memberNo);

        if (replyDeleteResponseDTO == null){
            return new ResponseEntity<>("잘못된 접근입니다. 댓글을 삭제할 수 없습니다.", HttpStatus.BAD_REQUEST);
        }else{
            return new ResponseEntity<>(replyDeleteResponseDTO, HttpStatus.OK);
        }
    }


    // 게시글 1개 상세 조회
//    @PostMapping("/detail")
//    public ResponseEntity<?> detail(@RequestBody){
//
//    }

    // 게시글 1개에 좋아요 누르기
//    @PostMapping("/like")
//    public ResponseEntity<?> like(@RequestBody )

//    // 게시글 검색
//    @PostMapping("/search")
//    public ResponseEntity<?> search(@RequestBody)
}
