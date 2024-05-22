package com.basic.deep.member.service;

import com.basic.deep.member.entity.Alert;
import com.basic.deep.member.repository.AlertRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.*;

import static com.basic.deep.member.entity.QAlert.alert;

@Service
@Transactional
public class AlertServiceImpl {

    @Autowired
    private AlertRepository alertRepository;

    private Optional<Alert> selectAndDelete(String memberID){
        return alertRepository.selectMemberIDAndDelete(memberID);
    }

    public List<Alert> selectMemberID() {
        return alertRepository.selectMemberID();
    }

    public void deleteMemberID(Long alertNo) {
        alertRepository.deleteMemberID(alertNo);
    }

}
