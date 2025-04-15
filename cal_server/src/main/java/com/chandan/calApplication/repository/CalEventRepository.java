package com.chandan.calApplication.repository;

import com.chandan.calApplication.entity.CalEventDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CalEventRepository extends JpaRepository<CalEventDetails, Long> {
    // Add this method
    List<CalEventDetails> findByUserId(String userId);
}