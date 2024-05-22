package com.basic.deep.board.repository;

import com.basic.deep.board.entity.BoardImg;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ImgRepository extends JpaRepository<BoardImg, Long>, ImgRepositoryCustom {

}
