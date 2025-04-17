package com.chandan.kalyndrApplication.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.chandan.kalyndrApplication.entity.KalyndrEventDetails;

import java.util.List;

@Repository
public interface KalyndrEventRepository extends JpaRepository<KalyndrEventDetails, Long> {
    // Add this method
    List<KalyndrEventDetails> findByUserId(String userId);
}