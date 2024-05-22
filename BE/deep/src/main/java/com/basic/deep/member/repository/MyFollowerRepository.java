package com.basic.deep.member.repository;

import com.basic.deep.member.entity.MyFollower;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MyFollowerRepository extends JpaRepository<MyFollower, Long>, MyFollowerRepositoryCusotom {
}
