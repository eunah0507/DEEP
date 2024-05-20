package com.basic.deep.member.repository;

import com.basic.deep.member.entity.Alert;

import java.util.List;
import java.util.Optional;

public interface AlertRepositoryCustom {

    // ID로 조회하면서 동시에 삭제하기
    Optional<Alert> selectMemberIDAndDelete(String memberID);
    List<Alert> selectMemberID();
    void deleteMemberID(Long alertNo);
}
