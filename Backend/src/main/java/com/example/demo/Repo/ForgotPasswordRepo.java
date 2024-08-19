package com.example.demo.Repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.Entity.UserEntity;

@Repository
public interface ForgotPasswordRepo extends JpaRepository<UserEntity, Long> {
    UserEntity findByUsernameAndEmail(String username, String email);
}
