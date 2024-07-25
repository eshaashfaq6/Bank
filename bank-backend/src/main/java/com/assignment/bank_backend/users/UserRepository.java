package com.assignment.bank_backend.users;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
    Optional<User> findByUseremail(String useremail);
    Boolean existsByUseremail(String useremail);

    Optional<User> findByUseremailAndPassword(String useremail, String password);
}