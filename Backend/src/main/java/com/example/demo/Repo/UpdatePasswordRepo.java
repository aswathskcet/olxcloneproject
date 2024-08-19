package com.example.demo.Repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.Entity.UpdatePasswordEntity;

@Repository
public interface UpdatePasswordRepo extends JpaRepository<UpdatePasswordEntity, Long> {
    UpdatePasswordEntity findByUsernameAndOldPassword(String username, String oldPassword);
}

