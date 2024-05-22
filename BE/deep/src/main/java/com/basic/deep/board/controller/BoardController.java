package com.basic.deep.board.controller;


import com.basic.deep.board.dto.*;
import com.basic.deep.board.service.*;
import com.basic.deep.member.service.MemberService;
import com.basic.deep.member.service.S3UploadService;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.validator.constraints.ModCheck;
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
    public ResponseEntity<?> write(@RequestBody BoardWriteRequestDTO boardWriteRequestDTO) {
        log.info("{}",boardWriteRequestDTO);
        Long memberNo = Long.parseLong(SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString());
        BoardWriteResponseDTO boardWriteResponseDTO = boardService.boardWrite(boardWriteRequestDTO, memberNo);

        log.info("{}",boardWriteResponseDTO);
        return new ResponseEntity<>(boardWriteResponseDTO, HttpStatus.OK);
    }

    // 게시글 수정
    @PutMapping("/modify")
    public ResponseEntity<?> modify(@RequestBody BoardModifyRequestDTO boardModifyRequestDTO) {
        log.info("{}",boardModifyRequestDTO);
        Long memberNo = Long.parseLong(SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString());
        BoardModifyResponseDTO boardModifyResponseDTO = boardService.boardModify(boardModifyRequestDTO, memberNo);

        if (boardModifyResponseDTO == null) {
            return new ResponseEntity<>("잘못된 접근입니다. 수정할 수 없습니다.", HttpStatus.BAD_REQUEST);
        } else {
            log.info("{}",boardModifyResponseDTO);
            return new ResponseEntity<>(boardModifyResponseDTO, HttpStatus.OK);
        }
    }

    // 게시글 삭제
    @DeleteMapping("/delete")
    public ResponseEntity<?> boardDelete(@ModelAttribute BoardDeleteRequestDTO boardDeleteRequestDTO) {
        log.info("{}",boardDeleteRequestDTO);
        Long memberNo = Long.parseLong(SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString());

        BoardDeleteResponseDTO boardDeleteResponseDTO = boardService.boardDelete(boardDeleteRequestDTO, memberNo);

        if (boardDeleteResponseDTO == null) {
            return new ResponseEntity<>("잘못된 접근입니다. 삭제할 수 없습니다.", HttpStatus.BAD_REQUEST);
        } else {
            log.info("{}",boardDeleteResponseDTO);
            return new ResponseEntity<>(boardDeleteResponseDTO, HttpStatus.OK);
        }
    }

    // 댓글 작성
    @PostMapping("reply-write")
    public ResponseEntity<?> replyWrite(@RequestBody ReplyWriteRequestDTO replyWriteRequestDTO) {
        log.info("{}",replyWriteRequestDTO);
        Long memberNo = Long.parseLong(SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString());

        ReplyWriteResponseDTO replyWriteResponseDTO = replyService.replyWrite(replyWriteRequestDTO, memberNo);
        log.info("{}",replyWriteResponseDTO);
        return new ResponseEntity<>(replyWriteResponseDTO, HttpStatus.OK);
    }

    // 댓글 수정
    @PutMapping("/reply-modify")
    public ResponseEntity<?> replyModify(@RequestBody ReplyModifyRequestDTO replyModifyRequestDTO) {
        log.info("{}",replyModifyRequestDTO);
        Long memberNo = Long.parseLong(SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString());
        ReplyModifyResponseDTO replyModifyResponseDTO = replyService.replyModify(replyModifyRequestDTO, memberNo);

        if (replyModifyResponseDTO == null) {
            return new ResponseEntity<>("잘못된 접근입니다. 댓글을 수정할 수 없습니다.", HttpStatus.BAD_REQUEST);
        } else {
            log.info("{}",replyModifyResponseDTO);
            return new ResponseEntity<>(replyModifyResponseDTO, HttpStatus.OK);
        }
    }

    // 댓글 삭제
    @DeleteMapping("reply-delete")
    public ResponseEntity<?> replyDelete(@ModelAttribute ReplyDeleteRequestDTO replyDeleteRequestDTO){
        log.info("{}",replyDeleteRequestDTO);
        Long memberNo = Long.parseLong(SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString());

        ReplyDeleteResponseDTO replyDeleteResponseDTO = replyService.replyDelete(replyDeleteRequestDTO, memberNo);

        if (replyDeleteResponseDTO == null){
            return new ResponseEntity<>("잘못된 접근입니다. 댓글을 삭제할 수 없습니다.", HttpStatus.BAD_REQUEST);
        }else{
            log.info("{}",replyDeleteResponseDTO);
            return new ResponseEntity<>(replyDeleteResponseDTO, HttpStatus.OK);
        }
    }


    // 게시글 1개 상세 조회
    @PostMapping("/detail")
    public ResponseEntity<?> detail(@RequestBody BoardDetailRequestDTO boardDetailRequestDTO){
        log.info("{}",boardDetailRequestDTO);
        Long memberNo = Long.parseLong(SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString());
        BoardDetailResponseDTO boardDetailResponseDTO = boardService.boardDetail(boardDetailRequestDTO, memberNo);

        log.info("{}",boardDetailResponseDTO);
        return new ResponseEntity<>(boardDetailResponseDTO, HttpStatus.OK);
    }

    // 게시글 1개에 좋아요 누르기
    @PostMapping("/like")
    public ResponseEntity<?> boardLike(@RequestBody BoardLikeRequestDTO boardLikeRequestDTO){
        log.info("{}",boardLikeRequestDTO);
        Long memberNo = Long.parseLong(SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString());
        BoardLikeResponseDTO boardLikeResponseDTO = boardLikeService.boardLike(boardLikeRequestDTO, memberNo);

        log.info("{}",boardLikeResponseDTO);
        return new ResponseEntity<>(boardLikeResponseDTO, HttpStatus.OK);
    }

    // 게시글 검색
    @PostMapping("/search")
    public ResponseEntity<?> search(@RequestBody BoardSearchRequestDTO boardSearchRequestDTO){
        log.info("{}",boardSearchRequestDTO);
        List<BoardSearchResponseDTO> boardSearchResponseDTO = boardService.searchBoard(boardSearchRequestDTO);

        log.info("{}",boardSearchResponseDTO);
        return new ResponseEntity<>(boardSearchResponseDTO, HttpStatus.OK);
    }

    // 게시글 1개 상세 조회 - 댓글 조회
    @GetMapping("/reply-list")
    public ResponseEntity<?> replyList(@ModelAttribute ReplyDetailRequestDTO replyDetailRequestDTO){
        log.info("{}",replyDetailRequestDTO);
        List<ReplyDetailResponseDTO> replyDetailResponseDTO = replyService.replyDatail(replyDetailRequestDTO);

        log.info("{}",replyDetailResponseDTO);
        return new ResponseEntity<>(replyDetailResponseDTO, HttpStatus.OK);
    }

    // 태그 조회
    @PostMapping("/search-tag")
    public ResponseEntity<?> searchTag(@RequestBody BoardSearchTagRequestDTO boardSearchTagRequestDTO){
        log.info("{}",boardSearchTagRequestDTO);
        if(boardSearchTagRequestDTO.getPage() <= 1 ){
            boardSearchTagRequestDTO.setPage(0L);
        }else{
            boardSearchTagRequestDTO.setPage( boardSearchTagRequestDTO.getPage() -1 );
        }
        List<BoardSearchTagResponseDTO> boardSearchTagResponseDTO = tagService.tagDetail(boardSearchTagRequestDTO);

        log.info("{}",boardSearchTagResponseDTO);
        return new ResponseEntity<>(boardSearchTagResponseDTO,HttpStatus.OK);
    }

    // 게시글 목록 조회 (게시판 하나 조회)
    @PostMapping("/category")
    public ResponseEntity<?> categoryList(@RequestBody BoardCategoryListRequestDTO boardCategoryListRequestDTO){
        log.info("{}",boardCategoryListRequestDTO);

        if (boardCategoryListRequestDTO.getPage() <= 1){
            boardCategoryListRequestDTO.setPage(0L);
        }else{
            boardCategoryListRequestDTO.setPage(boardCategoryListRequestDTO.getPage() -1);
        }
        List<BoardCategoryListResponseDTO> boardCategoryListResponseDTO = boardService.boardCategoryDetail(boardCategoryListRequestDTO);

        log.info("{}",boardCategoryListResponseDTO);
        return new ResponseEntity<>(boardCategoryListResponseDTO, HttpStatus.OK);
    }

    // 게시글 목록 조회 (메인 페이지용)
    @GetMapping("/main-index")
    public ResponseEntity<?> mainIndex(){
        List<BoardMainIndexResponseDTO> boardMainIndexResponseDTO = boardService.boardMainPage();

        log.info("{}",boardMainIndexResponseDTO);
        return new ResponseEntity<>(boardMainIndexResponseDTO, HttpStatus.OK);
    }

    // 인기글 목록 조회
    @GetMapping("/best")
    public ResponseEntity<?> best(@ModelAttribute BoardBestRequestDTO boardBestRequestDTO){
        log.info("{}",boardBestRequestDTO);

        if (boardBestRequestDTO.getPage() <= 1){
            boardBestRequestDTO.setPage(0L);
        }else{
            boardBestRequestDTO.setPage(boardBestRequestDTO.getPage() -1);
        }

        List<BoardBestResponseDTO> boardBestResponseDTO = boardService.boardBest(boardBestRequestDTO);

        log.info("{}",boardBestResponseDTO);
        return new ResponseEntity<>(boardBestResponseDTO, HttpStatus.OK);
    }

    // 이미지 보내기
    @PostMapping("/img")
    public ResponseEntity<?> postImg(@ModelAttribute BoardImgRequestDTO boardImgRequestDTO){
        log.info("{}",boardImgRequestDTO);
        // 이미지를 s3를 거쳐서 보낸다
        String postImg = s3UploadService.upload(boardImgRequestDTO.getImg(), "deepBoardImg");

        // 그걸 다시 responsebody에 담아서 보낸다.
        BoardImgResponseDTO boardImgResponseDTO = new BoardImgResponseDTO();
        boardImgResponseDTO.setImg(postImg);

        log.info("{}",boardImgResponseDTO);
        return new ResponseEntity<>(boardImgResponseDTO, HttpStatus.OK);
    }

    // 해당 게시글이 몇 페이지까지 있는지
    @PostMapping("/post-page")
    public ResponseEntity<?> postPage(@RequestBody BoardPostPageRequestDTO boardPostPageRequestDTO){
        log.info("{}",boardPostPageRequestDTO);
        BoardPostPageResponseDTO boardPostPageResponseDTO = boardService.selectCategoryPostMaxPage(boardPostPageRequestDTO);

        log.info("{}",boardPostPageResponseDTO);
        return new ResponseEntity<>(boardPostPageResponseDTO, HttpStatus.OK);
    }

    // 해당 게시글에 댓글이 몇 페이지까지 있는지
    @PostMapping("/reply-page")
    public ResponseEntity<?> replyPage(@RequestBody BoardReplyPageRequestDTO boardReplyPageRequestDTO){
        log.info("{}",boardReplyPageRequestDTO);
        BoardReplyResponseDTO boardReplyResponseDTO = boardService.selectBoardReplyMaxPage(boardReplyPageRequestDTO);


        log.info("{}",boardReplyResponseDTO);
        return new ResponseEntity<>(boardReplyResponseDTO, HttpStatus.OK);
    }
}
