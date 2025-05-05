package com.vanshika.demo.dao;

import com.vanshika.demo.modal.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuizRepo extends JpaRepository<Quiz,Integer> {

    @Query(value="SELECT * FROM quiz q WHERE q.category=:category",nativeQuery = true)
    List<Quiz> getAllQuiz(String category);
}
