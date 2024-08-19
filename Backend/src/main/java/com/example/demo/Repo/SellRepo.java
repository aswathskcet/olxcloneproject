package com.example.demo.Repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.demo.Entity.SellEntity;


@Repository
public interface SellRepo extends JpaRepository<SellEntity, Long> {
    @Query("SELECT s FROM SellEntity s WHERE LOWER(s.title) LIKE LOWER(CONCAT('%', :query, '%'))")
    List<SellEntity> searchByTitle(String query);
   
}


