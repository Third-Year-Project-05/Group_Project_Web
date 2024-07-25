package com.echolynk.echolynkbackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class EcholynkBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(EcholynkBackendApplication.class, args);
    }

}
