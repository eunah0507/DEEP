package com.basic.deep.member.controller;

import com.basic.deep.member.entity.Alert;
import com.basic.deep.member.repository.AlertRepository;
import com.basic.deep.member.service.SseEmitterService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.concurrent.CopyOnWriteArraySet;

@RestController
@Slf4j
public class AlertController {

    private Set<SseEmitter> emitterSet = new CopyOnWriteArraySet<>();

    @Autowired
    private AlertRepository alertRepository;
    @Autowired
    private SseEmitterService sseEmitterService;


    @GetMapping(value = "/connectAlert", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public ResponseEntity<SseEmitter> connectAlert(@RequestParam String memberID) {
        SseEmitter emitter = sseEmitterService.subscribe(memberID);
        return ResponseEntity.ok(emitter);
    }

    @Scheduled(cron = "0/5 * * * * ?")
    public void sendPlaylistAtSpecificTime() {
        List<Alert> alerts = alertRepository.selectMemberID();

        for(Alert alert : alerts) {
            sseEmitterService.publish(alert);
//            log.info(alert.getMemberID());
        }
    }
}
