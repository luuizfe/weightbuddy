
package com.weightbuddy.dto;

// DTO responsável por definir quais informações
// serão retornadas ao cliente após uma operação com usuário.
public record UserResponse(

        // Identificador único do usuário no banco de dados.
        Long id,

        // Nome completo do usuário.
        String nome,

        // Nome de usuário cadastrado.
        String usuario,

        // E-mail cadastrado.
        String email

) {}
