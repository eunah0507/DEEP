package com.basic.deep.board.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.beans.factory.annotation.Autowired;

public class ImgRepositoryImpl implements ImgRepositoryCustom{

    @Autowired
    private JPAQueryFactory queryFactory;
}
