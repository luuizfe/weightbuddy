
package com.weightbuddy.service;

import com.weightbuddy.dto.UserRequest;
import com.weightbuddy.dto.UserResponse;
import com.weightbuddy.model.User;
import com.weightbuddy.repository.UserRepository;

import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

// Indica ao Spring que esta classe contém regras de negócio
// relacionadas às operações de usuários.
@Service
public class UserService {

    // Repository responsável pelo acesso aos dados dos usuários.
    private final UserRepository userRepository;

    // Componente responsável por gerar e validar hashes de senhas.
    private final PasswordEncoder passwordEncoder;

    // Construtor utilizado pelo Spring para injetar as dependências.
    public UserService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // Método responsável por realizar o cadastro de um novo usuário.
    // Recebe os dados através do UserRequest e retorna um UserResponse.
    public UserResponse createUser(UserRequest request) {

        // Verifica se o nome de usuário já está cadastrado.
        // Caso exista, interrompe a operação e retorna HTTP 409 (Conflict).
        if (userRepository.existsByUsuario(request.usuario())) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Usuário já cadastrado"
            );
        }

        // Verifica se o e-mail já está sendo utilizado por outro usuário.
        // Evita cadastros duplicados na aplicação.
        if (userRepository.existsByEmail(request.email())) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "E-mail já cadastrado"
            );
        }

        // Cria uma nova instância da entidade User.
        User user = new User();

        // Transfere os dados recebidos pelo DTO para a entidade.
        user.setNome(request.nome());
        user.setUsuario(request.usuario());

        // Gera um hash BCrypt da senha antes de armazená-la.
        // A senha original não será salva no banco de dados.
        user.setSenha(passwordEncoder.encode(request.senha()));

        user.setEmail(request.email());

        // Persiste o novo usuário no banco de dados.
        User savedUser = userRepository.save(user);

        // Converte a entidade salva em UserResponse.
        // A senha não é incluída nos dados retornados pela API.
        return new UserResponse(
                savedUser.getId(),
                savedUser.getNome(),
                savedUser.getUsuario(),
                savedUser.getEmail()
        );
    }
}
