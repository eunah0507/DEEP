package com.basic.deep.board.service;

import com.basic.deep.board.dto.*;
import com.basic.deep.board.entity.*;
import com.basic.deep.board.repository.*;
import com.basic.deep.member.entity.Member;
import com.basic.deep.member.repository.MemberRepository;
import com.basic.deep.member.service.S3UploadService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

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

    @Autowired
    private BoardLikeRepository boardLikeRepository;

    @Autowired
    private ReplyRepository replyRepository;

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
                        .boardReadCount(0L)
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
        if (board.getMember_no().getMemberNo() != memberNo) {
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
        if (board.getMember_no().getMemberNo() != memberNo) {
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
    @Override
    public BoardDetailResponseDTO boardDetail(BoardDetailRequestDTO boardDetailRequestDTO, Long memberNo) {
        Board board = boardRepository.getReferenceById(boardDetailRequestDTO.getBoardNo());
        Member member = board.getMember_no();
        List<String> boardImg = imgRepository.findAllBoardDetailImg(board);
        Optional<BoardLike> boardLike = boardLikeRepository.selectBoardLike(board.getBoardNo(), memberNo);
        Long boardLikeCount = boardLikeRepository.selectBoardDetailLikeCount(board.getBoardNo());
        Long replyCount = replyRepository.selectReplyCount(board.getBoardNo());
        List<String> boardTag = tagRepository.findAllBoardDetailTag(board);

        // 게시글 조회수 증가
        board.plusView();

        BoardDetailResponseDTO boardDetailResponseDTO = new BoardDetailResponseDTO();
        boardDetailResponseDTO.setTitle(board.getBoardTitle());
        boardDetailResponseDTO.setContent(board.getBoardContent());
        boardDetailResponseDTO.setMemberNickName(member.getMemberNickname());
        boardDetailResponseDTO.setMemberRandom(member.getMemberRandom());
        boardDetailResponseDTO.setMemberFile(member.getMemberFile());
        boardDetailResponseDTO.setBoardCreatedTime(board.getBoardDate());
        boardDetailResponseDTO.setView(board.getBoardReadCount());
        boardDetailResponseDTO.setImg(boardImg);
        boardDetailResponseDTO.setLike(boardLikeCount);
        boardDetailResponseDTO.setReply(replyCount);
        boardDetailResponseDTO.setTag(boardTag);


        if (boardLike.isEmpty()) {
            boardDetailResponseDTO.setMeLike(false);
        } else {
            boardDetailResponseDTO.setMeLike(true);
        }

        return boardDetailResponseDTO;
    }

    // 1개 게시판 목록 전체 조회
    @Override
    public List<BoardCategoryListResponseDTO> boardCategoryDetail(BoardCategoryListRequestDTO boardCategoryListRequestDTO) {
        List<BoardCategoryListResponseDTO> boardCategory = boardRepository.findAllBoardCategory(boardCategoryListRequestDTO.getCategory(), boardCategoryListRequestDTO.getPage());
        boardCategory = boardCategory.stream().map(this::boardList).toList();

        return boardCategory;
    }

    // 1개 게시판 목록 전체 조회 이어서
    public BoardCategoryListResponseDTO boardList(BoardCategoryListResponseDTO boardCategoryListResponseDTO){
        Board board = boardRepository.getReferenceById(boardCategoryListResponseDTO.getBoardNo());
        boardCategoryListResponseDTO.setLike(boardLikeRepository.selectBoardDetailLikeCount(board.getBoardNo()));
        boardCategoryListResponseDTO.setReply(replyRepository.selectReplyCount(board.getBoardNo()));
        boardCategoryListResponseDTO.setTag(tagRepository.findAllBoardDetailTag(board));

        return boardCategoryListResponseDTO;
    }


     // 메인 페이지용 게시판 조회
    @Override
    public List<BoardMainIndexResponseDTO> boardMainPage() {
        List<BoardCategoryListResponseDTO> notice = boardRepository.findAllBoardCategory(Category.notice, 0L);
        List<BoardMainIndexResponseDTO> mainNotice = new java.util.ArrayList<>(notice.stream().map(o -> boardMainIndex(o, Category.notice)).limit(1).toList());

        // BoardBest는 아래에 따로 채워서 o -> 이거 안함
        List<BoardBestResponseDTO> boardBest = boardRepository.findAllBoardLike(0L);
        List<BoardMainIndexResponseDTO> mainBest = boardBest.stream().map(this::boardMainBest).limit(5).toList();

        List<BoardCategoryListResponseDTO> skill = boardRepository.findAllBoardCategory(Category.skill, 0L);
        List<BoardMainIndexResponseDTO> mainSkill = skill.stream().map(o -> boardMainIndex(o, Category.skill)).limit(5).toList();

        List<BoardCategoryListResponseDTO> qna = boardRepository.findAllBoardCategory(Category.qna, 0L);
        List<BoardMainIndexResponseDTO> mainQnA = qna.stream().map(o -> boardMainIndex(o, Category.qna)).limit(5).toList();

        List<BoardCategoryListResponseDTO> community = boardRepository.findAllBoardCategory(Category.community, 0L);
        List<BoardMainIndexResponseDTO> mainCommunity = community.stream().map(o -> boardMainIndex(o, Category.community)).limit(5).toList();

        mainNotice.addAll(mainBest);
        mainNotice.addAll(mainSkill);
        mainNotice.addAll(mainQnA);
        mainNotice.addAll(mainCommunity);

        return mainNotice;
    }

    // 메인 페이지 > 인기글 전용
    // boardMainIndexResponseDTO.setBest(true);
    // 이건 다른 게시판에서 넘어오는 글들과 인기 게시판 글을 구분하기 위한 DTO
    // 컬럼으로 존재 X, 오로지 메인 페이지에서 구분하기 위해 만든 것.
    public BoardMainIndexResponseDTO boardMainBest(BoardBestResponseDTO boardBestResponseDTO){
        BoardMainIndexResponseDTO boardMainIndexResponseDTO = new BoardMainIndexResponseDTO();

        boardMainIndexResponseDTO.setBoardNo(boardBestResponseDTO.getBoardNo());
        boardMainIndexResponseDTO.setCategory(boardBestResponseDTO.getCategory());
        boardMainIndexResponseDTO.setIsBest(true);
        boardMainIndexResponseDTO.setBoardTitle(boardBestResponseDTO.getBoardTitle());
        boardMainIndexResponseDTO.setMemberNickName(boardBestResponseDTO.getMemberNickName());
        boardMainIndexResponseDTO.setMemberRandom(boardBestResponseDTO.getMemberRandom());
        boardMainIndexResponseDTO.setMemberFile(boardBestResponseDTO.getMemberFile());
        boardMainIndexResponseDTO.setBoardCreatedTime(boardBestResponseDTO.getBoardCreatedTime());
        boardMainIndexResponseDTO.setReply(replyRepository.selectReplyCount(boardBestResponseDTO.getBoardNo()));
        boardMainIndexResponseDTO.setLike(boardBestResponseDTO.getLike());

        return boardMainIndexResponseDTO;
    }

    // 로그인 후 메인페이지 전체 조회 이어서
    public BoardMainIndexResponseDTO boardMainIndex(BoardCategoryListResponseDTO boardCategoryListResponseDTO, Category category){
        BoardMainIndexResponseDTO boardMainIndexResponseDTO = new BoardMainIndexResponseDTO();
        Member member = memberRepository.selectMemberNickAndRandom(boardCategoryListResponseDTO.getMemberNickName(), boardCategoryListResponseDTO.getMemberRandom()).orElse(null);

        boardMainIndexResponseDTO.setBoardNo(boardCategoryListResponseDTO.getBoardNo());
        boardMainIndexResponseDTO.setIsBest(false);
        boardMainIndexResponseDTO.setCategory(category);
        boardMainIndexResponseDTO.setBoardTitle(boardCategoryListResponseDTO.getBoardTitle());
        boardMainIndexResponseDTO.setMemberNickName(boardCategoryListResponseDTO.getMemberNickName());
        boardMainIndexResponseDTO.setMemberRandom(boardCategoryListResponseDTO.getMemberRandom());
        boardMainIndexResponseDTO.setMemberFile(member.getMemberFile());
        boardMainIndexResponseDTO.setBoardCreatedTime(boardCategoryListResponseDTO.getBoardCreatedTime());
        boardMainIndexResponseDTO.setLike(boardLikeRepository.selectBoardDetailLikeCount(boardMainIndexResponseDTO.getBoardNo()));
        boardMainIndexResponseDTO.setReply(replyRepository.selectReplyCount(boardMainIndexResponseDTO.getBoardNo()));

        return boardMainIndexResponseDTO;
    }

    // 게시글 검색
    @Override
    public List<BoardSearchResponseDTO> searchBoard(BoardSearchRequestDTO boardSearchRequestDTO) {
        List<BoardSearchResponseDTO> searchBoard = boardRepository.selectBoardByTitleOrContent(boardSearchRequestDTO.getKeyword());
        searchBoard = searchBoard.stream().map(this::searchOtherThings).toList();

        return searchBoard;
    }

    // 게시글 검색 이어서
    public BoardSearchResponseDTO searchOtherThings(BoardSearchResponseDTO boardSearchResponseDTO){
        Board board = boardRepository.getReferenceById(boardSearchResponseDTO.getBoardNo());
        Member member = board.getMember_no();
        boardSearchResponseDTO.setMemberNickName(member.getMemberNickname());
        boardSearchResponseDTO.setMemberRandom(member.getMemberRandom());

        boardSearchResponseDTO.setLike(boardLikeRepository.selectBoardDetailLikeCount(board.getBoardNo()));
        boardSearchResponseDTO.setReply(replyRepository.selectReplyCount(board.getBoardNo()));
        boardSearchResponseDTO.setTag(tagRepository.findAllBoardDetailTag(board));

        return boardSearchResponseDTO;
    }


    // 인기글 게시판 목록 조회
    @Override
    public List<BoardBestResponseDTO> boardBest(BoardBestRequestDTO boardBestRequestDTO) {
        List<BoardBestResponseDTO> boardBest = boardRepository.findAllBoardLike(boardBestRequestDTO.getPage());
        boardBest = boardBest.stream().map(this::boardBestPlus).toList();

        return boardBest;
    }

    // 인기글 게시판 이어서
    public BoardBestResponseDTO boardBestPlus(BoardBestResponseDTO boardBestResponseDTO){
        boardBestResponseDTO.setReply(replyRepository.selectReplyCount(boardBestResponseDTO.getBoardNo()));

        return boardBestResponseDTO;
    }
}
