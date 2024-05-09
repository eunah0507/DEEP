package com.basic.deep.board.repository;

import com.basic.deep.board.entity.BoardTag;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TagRepository extends JpaRepository<BoardTag, Long>, TagRepositoryCustom {
}
