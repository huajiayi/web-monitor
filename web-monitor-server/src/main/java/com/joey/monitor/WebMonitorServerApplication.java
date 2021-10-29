package com.joey.monitor;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import springfox.documentation.oas.annotations.EnableOpenApi;

@EnableOpenApi
@EnableJpaAuditing
@SpringBootApplication
public class WebMonitorServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(WebMonitorServerApplication.class, args);
	}

}
