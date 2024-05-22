package com.basic.deep;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@SpringBootApplication
public class DeepApplication {

	public static void main(String[] args) {
		SpringApplication.run(DeepApplication.class, args);
	}

}
