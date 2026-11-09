
package com.weightbuddy.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

// DTO responsável por receber os dados enviados pelo cliente
// durante uma requisição de cadastro de usuário.
public record UserRequest(

        // Nome completo do usuário.
        @NotBlank
        @Size(max = 100)
        String nome,

        // Nome de usuário utilizado para identificação no sistema.
        @NotBlank
        @Size(max = 50)
        String usuario,

        // Senha informada no cadastro.
        // Deve possuir no mínimo 8 caracteres.
        @NotBlank
        @Size(min = 8)
        String senha,

        // E-mail utilizado pelo usuário.
        // Deve possuir um formato válido.
        @NotBlank
        @Email
        @Size(max = 150)
        String email

) {}
