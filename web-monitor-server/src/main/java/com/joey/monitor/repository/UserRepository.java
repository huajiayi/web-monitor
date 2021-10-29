package com.joey.monitor.repository;

import com.joey.monitor.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {

    boolean existsByName(String name);
}
