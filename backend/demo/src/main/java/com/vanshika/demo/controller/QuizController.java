package com.vanshika.demo.controller;

import com.vanshika.demo.modal.Question;
import com.vanshika.demo.modal.QuestionWrapper;
import com.vanshika.demo.modal.Quiz;
import com.vanshika.demo.modal.Response;
import com.vanshika.demo.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("quiz")
@CrossOrigin
public class QuizController {

    @Autowired
    private QuizService service;
    @GetMapping("/create")
    public ResponseEntity<String> createQuiz(@RequestParam String category,@RequestParam int num, @RequestParam String title){
        return  service.createQuiz(category,num,title);
    }
    @GetMapping("/get/{id}")
    public ResponseEntity<List<QuestionWrapper>> getAllQuestions(@PathVariable  int id){
        return service.getAllQuestions(id);
    }
    @GetMapping("/getadmin/{id}")
    public  ResponseEntity<List<Question>> getAllQuestionsAdmin(@PathVariable int id){
        return service.getAllQuestionsAdmin(id);
    }
    @GetMapping("/getAllQuiz")
    public List<Quiz> getAllQuiz(@RequestParam String category){
        return service.getAllQuiz(category);
    }
    @GetMapping("/allquiz")
    public ResponseEntity<List<Quiz>> AllQuiz(){
        return service.AllQuiz();
    }
    @PostMapping("/submit/{id}")
    public ResponseEntity<Integer> calc(@PathVariable int id,@RequestBody List<Response> responses){
        return service.calc(id,responses);
    }

}
