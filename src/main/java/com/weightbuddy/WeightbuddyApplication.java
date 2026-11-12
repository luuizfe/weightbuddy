package com.weightbuddy;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.weightbuddy.model.TesteRepository;

@SpringBootApplication
public class WeightbuddyApplication {

    public static void main(String[] args) {
        SpringApplication.run(WeightbuddyApplication.class, args);
    }

    @Bean
    CommandLineRunner run(TesteRepository repository) {
        return args -> {
            System.out.println("teste");

            repository.findAll().forEach(registro
                    -> System.out.println("Dado encontrado: " + registro.getNome())
            );

            System.out.println("conectado");
        };
    }
}
