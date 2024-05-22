package com.basic.deep.member.repository;

import com.basic.deep.member.entity.AddFriends;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AddFriendsRepository extends JpaRepository <AddFriends, Long>, AddFriendsRepositoryCustom {
}
