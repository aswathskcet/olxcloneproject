package com.example.demo.Repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.Entity.UserEntity;

@Repository
public interface UserRepo extends JpaRepository<UserEntity, Long> {
	UserEntity findByUsername(String username);
	 Optional<UserEntity> findByUsernameAndPassword(String username, String password);
}
