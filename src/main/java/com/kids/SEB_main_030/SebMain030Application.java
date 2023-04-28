package com.kids.SEB_main_030;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class SebMain030Application {

	public static void main(String[] args) {
		SpringApplication.run(SebMain030Application.class, args);
	}

}
