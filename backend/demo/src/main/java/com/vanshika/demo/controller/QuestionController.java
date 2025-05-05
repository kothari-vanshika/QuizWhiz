package com.vanshika.demo.controller;

import com.vanshika.demo.modal.Question;
import com.vanshika.demo.service.QuestionService;
import org.aspectj.weaver.patterns.TypePatternQuestions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("question")
@CrossOrigin
public class QuestionController {

    @Autowired
    private QuestionService service;
    @GetMapping("questions")
    public ResponseEntity<List<Question>> getAllquestions(){
      return service.getAllquestions();
    }
    @GetMapping("questions/{id}")
    public ResponseEntity<Optional<Question>> getById(@PathVariable int id){

        return service.getById(id);
    }
   @GetMapping("/categories")
   public List<String> getCategories(){
        return service.getCategories();
   }
    @PostMapping("/questions/add")
    public ResponseEntity<String> addQuestion(@RequestBody  Question q){
       return service.addQuestion(q);
    }
    @PutMapping("/questions/update/{id}")
    public ResponseEntity<Question> updateQuestion(@PathVariable int id,@RequestBody Question q){
        return service.updateQuestion(id,q);
    }
    @DeleteMapping("/questions/delete/{id}")
    public ResponseEntity<String> deleteQuestion(@PathVariable int id){
        return service.deleteQuestion(id);
    }
}
