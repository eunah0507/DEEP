package com.basic.deep.member.service;

import com.basic.deep.member.entity.Alert;
import com.basic.deep.member.repository.AlertRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class AlertServiceImpl {

    @Autowired
    private AlertRepository alertRepository;

    private Optional<Alert> selectAndDelete(String memberID){
        return alertRepository.selectMemberIDAndDelete(memberID);
    }
}
