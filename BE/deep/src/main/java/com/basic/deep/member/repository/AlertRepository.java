package com.basic.deep.member.repository;

import com.basic.deep.member.entity.Alert;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AlertRepository extends JpaRepository<Alert, Long>, AlertRepositoryCustom{
}
