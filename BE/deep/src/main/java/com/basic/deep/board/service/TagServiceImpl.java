package com.basic.deep.board.service;

import com.basic.deep.board.dto.BoardSearchTagRequestDTO;
import com.basic.deep.board.dto.BoardSearchTagResponseDTO;
import com.basic.deep.board.entity.Board;
import com.basic.deep.board.repository.BoardLikeRepository;
import com.basic.deep.board.repository.BoardRepository;
import com.basic.deep.board.repository.ReplyRepository;
import com.basic.deep.board.repository.TagRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class TagServiceImpl implements TagService{
    @Autowired
    private TagRepository tagRepository;
    @Autowired
    private BoardLikeRepository boardLikeRepository;
    @Autowired
    private ReplyRepository replyRepository;
    @Autowired
    private BoardRepository boardRepository;


    // 태그 조회
    @Override
    public List<BoardSearchTagResponseDTO> tagDetail(BoardSearchTagRequestDTO boardSearchTagRequestDTO) {
        List<BoardSearchTagResponseDTO> boardList = tagRepository.selectTag(boardSearchTagRequestDTO.getTag(), boardSearchTagRequestDTO.getPage());

        return boardList.stream().map(this::addData).toList();
    }

    public BoardSearchTagResponseDTO addData(BoardSearchTagResponseDTO boardSearchTagResponseDTO){
        Long likeCount = boardLikeRepository.selectBoardDetailLikeCount(boardSearchTagResponseDTO.getBoardNo());
        Long replyCount = replyRepository.selectReplyCount(boardSearchTagResponseDTO.getBoardNo());
        Board board = boardRepository.getReferenceById(boardSearchTagResponseDTO.getBoardNo());
        List<String> tagList = tagRepository.findAllBoardDetailTag(board);

        boardSearchTagResponseDTO.setLike(likeCount);
        boardSearchTagResponseDTO.setReply(replyCount);
        boardSearchTagResponseDTO.setTag(tagList);

        return boardSearchTagResponseDTO;
    }
}
