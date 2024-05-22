package com.basic.deep.board.repository;

import com.basic.deep.board.entity.BoardLike;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BoardLikeRepository  extends JpaRepository<BoardLike, Long>, BoardLikeRepositoryCustom {
}
