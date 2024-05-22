package com.basic.deep.board.repository;

import com.basic.deep.board.entity.BoardReply;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReplyRepository extends JpaRepository<BoardReply, Long>, ReplyRepositoryCustom{
}
