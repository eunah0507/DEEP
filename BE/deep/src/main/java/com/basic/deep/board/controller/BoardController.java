package com.basic.deep.board.controller;


import com.basic.deep.board.dto.BoardWriteRequestDTO;
import com.basic.deep.board.dto.BoardWriteResponseDTO;
import com.basic.deep.board.service.BoardService;
import com.basic.deep.board.service.ImgService;
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

    // 게시글 작성
    @PostMapping("/write")
    public ResponseEntity<?> write(@ModelAttribute BoardWriteRequestDTO boardWriteRequestDTO){
        Long memberNo = Long.parseLong(SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString());
        BoardWriteResponseDTO boardWriteResponseDTO = boardService.boardWrite(boardWriteRequestDTO, memberNo);

        return new ResponseEntity<>(boardWriteResponseDTO, HttpStatus.OK);
    }
}
