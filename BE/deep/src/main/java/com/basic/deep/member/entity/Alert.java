package com.basic.deep.member.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Alert {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long alertNo;

    @Column(name = "member_id", length = 100, nullable = false)
    private String memberID;

    @Column(name = "alert_title", length = 100, nullable = false)
    private String alertTitle;

    @Column(name = "alert_content", length = 500, nullable = false)
    private String alertContent;
}
