package com.vanshika.demo.service;


import com.vanshika.demo.dao.QuestionRepo;
import com.vanshika.demo.modal.Question;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class QuestionService {
    @Autowired
    private QuestionRepo repo;
    public ResponseEntity<List<Question>> getAllquestions() {
        try {
            List<Question> questions = repo.findAll();
            return new ResponseEntity<>(questions, HttpStatus.OK);
        } catch (Exception e) {
             e.printStackTrace();
        }
        return new ResponseEntity<>(new ArrayList<>(),HttpStatus.BAD_REQUEST);
    }

    public ResponseEntity<Optional<Question>>getById(int id) {
        try {
            Optional<Question> q=repo.findById(id);
            return new ResponseEntity<>(q,HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>(Optional.empty(),HttpStatus.BAD_REQUEST);
    }

    public ResponseEntity<String> addQuestion(Question q) {
        try {
            repo.save(q);
            return new ResponseEntity<>("Success",HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>("",HttpStatus.BAD_REQUEST);
    }
    public ResponseEntity<Question> updateQuestion(int id, Question q){
        repo.save(q);
        return new ResponseEntity<>(q,HttpStatus.OK);
    }

    public ResponseEntity<String> deleteQuestion(int id) {
        repo.deleteById(id);
        return new ResponseEntity<>("success",HttpStatus.OK);
    }

    public List<String> getCategories() {
        return repo.findAllCategories();
    }
}
