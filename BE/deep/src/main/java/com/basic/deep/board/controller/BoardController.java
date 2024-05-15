package com.basic.deep.board.controller;


import com.basic.deep.board.dto.*;
import com.basic.deep.board.service.*;
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

import java.util.List;

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

    @Autowired
    private BoardLikeService boardLikeService;

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
    public ResponseEntity<?> boardDelete(@ModelAttribute BoardDeleteRequestDTO boardDeleteRequestDTO) {
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
    @PostMapping("/detail")
    public ResponseEntity<?> detail(@RequestBody BoardDetailRequestDTO boardDetailRequestDTO){
        Long memberNo = Long.parseLong(SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString());
        BoardDetailResponseDTO boardDetailResponseDTO = boardService.boardDetail(boardDetailRequestDTO, memberNo);

        return new ResponseEntity<>(boardDetailResponseDTO, HttpStatus.OK);
    }

    // 게시글 1개에 좋아요 누르기
    @PostMapping("/like")
    public ResponseEntity<?> boardLike(@RequestBody BoardLikeRequestDTO boardLikeRequestDTO){
        Long memberNo = Long.parseLong(SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString());
        BoardLikeResponseDTO boardLikeResponseDTO = boardLikeService.boardLike(boardLikeRequestDTO, memberNo);

        return new ResponseEntity<>(boardLikeResponseDTO, HttpStatus.OK);
    }

    // 게시글 검색
    @PostMapping("/search")
    public ResponseEntity<?> search(@RequestBody BoardSearchRequestDTO boardSearchRequestDTO){
        List<BoardSearchResponseDTO> boardSearchResponseDTO = boardService.searchBoard(boardSearchRequestDTO);

        return new ResponseEntity<>(boardSearchResponseDTO, HttpStatus.OK);
    }

    // 게시글 1개 상세 조회 - 댓글 조회
    @GetMapping("/reply-list")
    public ResponseEntity<?> replyList(@ModelAttribute ReplyDetailRequestDTO replyDetailRequestDTO){
        List<ReplyDetailResponseDTO> replyDetailResponseDTO = replyService.replyDatail(replyDetailRequestDTO);

        return new ResponseEntity<>(replyDetailResponseDTO, HttpStatus.OK);
    }

    // 태그 조회
    @PostMapping("/search-tag")
    public ResponseEntity<?> searchTag(@RequestBody BoardSearchTagRequestDTO boardSearchTagRequestDTO){
        if(boardSearchTagRequestDTO.getPage() <= 1 ){
            boardSearchTagRequestDTO.setPage(0L);
        }else{
            boardSearchTagRequestDTO.setPage( boardSearchTagRequestDTO.getPage() -1 );
        }
        List<BoardSearchTagResponseDTO> boardSearchTagResponseDTO = tagService.tagDetail(boardSearchTagRequestDTO);
        return new ResponseEntity<>(boardSearchTagResponseDTO,HttpStatus.OK);
    }

    // 게시글 목록 조회 (게시판 하나 조회)
    @PostMapping("/category")
    public ResponseEntity<?> categoryList(@RequestBody BoardCategoryListRequestDTO boardCategoryListRequestDTO){
        if (boardCategoryListRequestDTO.getPage() <= 1){
            boardCategoryListRequestDTO.setPage(0L);
        }else{
            boardCategoryListRequestDTO.setPage(boardCategoryListRequestDTO.getPage() -1);
        }
        List<BoardCategoryListResponseDTO> boardCategoryListResponseDTO = boardService.boardCategoryDetail(boardCategoryListRequestDTO);

        return new ResponseEntity<>(boardCategoryListResponseDTO, HttpStatus.OK);
    }

    // 게시글 목록 조회 (메인 페이지용)
    @GetMapping("/main-index")
    public ResponseEntity<?> mainIndex(){
        List<BoardMainIndexResponseDTO> boardMainIndexResponseDTO = boardService.boardMainPage();

        return new ResponseEntity<>(boardMainIndexResponseDTO, HttpStatus.OK);
    }

    // 인기글 목록 조회
    @GetMapping("/best")
    public ResponseEntity<?> best(@RequestBody BoardBestRequestDTO boardBestRequestDTO){

        return new ResponseEntity<>(HttpStatus.OK);
    }
}