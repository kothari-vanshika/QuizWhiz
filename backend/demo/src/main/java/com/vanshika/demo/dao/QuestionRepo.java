package com.vanshika.demo.dao;


import com.vanshika.demo.modal.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionRepo extends JpaRepository<Question,Integer> {
  @Query(value="SELECT * FROM questions  q WHERE q.category=:category ORDER BY RANDOM() LIMIT :num",nativeQuery = true)
    List<Question> findByCategorynum(String category,int num);

    @Query(value="SELECT DISTINCT category FROM questions q",nativeQuery = true)
  List<String> findAllCategories();
}
