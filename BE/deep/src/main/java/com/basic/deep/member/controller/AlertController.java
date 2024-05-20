package com.basic.deep.member.controller;

import com.basic.deep.member.entity.Alert;
import com.basic.deep.member.repository.AlertRepository;
import lombok.Value;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@Slf4j
public class AlertController {
//    private final SseEmitters sseEmitters;
//
//    // 아래가 싫다면 그냥 @Autowired 쓰면 됨
//    public AlertController (SseEmitters sseEmitters){
//        this.sseEmitters = sseEmitters;
//    }

    @Autowired
    private AlertRepository alertRepository;

    @GetMapping(value = "/connectAlert/{memberID}", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public ResponseEntity<SseEmitter> connectAlert(@PathVariable String memberID) {
        SseEmitter emitter = new SseEmitter();
        Optional<Alert> selectMemberIDAndDelete = alertRepository.selectMemberIDAndDelete(memberID);

        try {
            if (selectMemberIDAndDelete.isEmpty()) {
                emitter.send(SseEmitter.event()
                        .name("NoEvent")
                        .data("새로운 알림이 없습니다."));

            } else {
                emitter.send(SseEmitter.event()
                        .name(selectMemberIDAndDelete.get().getAlertTitle())
                        .data(selectMemberIDAndDelete.get().getAlertContent()));
            }
        } catch (
                IOException e) {
            throw new RuntimeException(e);
        }

        return ResponseEntity.ok(emitter);
    }
}
