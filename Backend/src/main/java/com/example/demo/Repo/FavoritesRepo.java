package com.example.demo.Repo;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.Entity.FavoritesEntity;



@Repository
public interface FavoritesRepo extends JpaRepository<FavoritesEntity, Long> {
	List<FavoritesEntity> findByUserId(Long userId);
    void deleteByUserIdAndItemId(Long userId, Long itemId);
}
