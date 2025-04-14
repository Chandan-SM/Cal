package com.chandan.calApplication.repository;

import com.chandan.calApplication.entity.CalEventDetails;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CalEventRepository extends JpaRepository<CalEventDetails, Long> {
}
