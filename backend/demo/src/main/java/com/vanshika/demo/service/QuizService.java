package com.vanshika.demo.service;

import com.vanshika.demo.dao.QuestionRepo;
import com.vanshika.demo.dao.QuizRepo;
import com.vanshika.demo.modal.Question;
import com.vanshika.demo.modal.QuestionWrapper;
import com.vanshika.demo.modal.Quiz;
import com.vanshika.demo.modal.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class QuizService {
    @Autowired
    private QuizRepo repo;
    @Autowired
    private QuestionRepo questiondao;
    public ResponseEntity<String> createQuiz(String category, int num, String title) {
      List<Question> quizquestions=questiondao.findByCategorynum(category,num);
      Quiz quiz=new Quiz();
      quiz.setTitle(title);
      quiz.setNum(num);
      quiz.setCategory(category);
      quiz.setQuestions(quizquestions);
      repo.save(quiz);
      return new ResponseEntity<>("success", HttpStatus.OK);
    }

    public ResponseEntity<List<QuestionWrapper>> getAllQuestions(int id) {
     Optional<Quiz> quiz=repo.findById(id);
     List<QuestionWrapper> questionsuser=new ArrayList<>();
     List<Question> questionsfromdb=quiz.get().getQuestions();
     for(Question q:questionsfromdb){
      QuestionWrapper qw=new QuestionWrapper(q.getId(),q.getOption1(),q.getOption2(),q.getOption3(),q.getOption4(),q.getQuestiontitle(),q.getCategory(),q.getDifficultylevel());
      questionsuser.add(qw);
     }
        return new ResponseEntity<>(questionsuser,HttpStatus.OK);
    }

    public ResponseEntity<List<Question>> getAllQuestionsAdmin(int id) {
        Optional<Quiz> quiz=repo.findById(id);
        List<Question> questionsadmin=quiz.get().getQuestions();

        return new ResponseEntity<>(questionsadmin,HttpStatus.OK);
    }
    public ResponseEntity<Integer> calc(int id,List<Response> responses) {
        int right=0;
        Optional<Quiz> q=repo.findById(id);
        List<Question> questions=q.get().getQuestions();
        int i=0;
        for(Response response:responses){
            int qid=response.getId();
            for(Question question:questions) {
                if (question.getId() == qid) {
                    if (response.getResponse().equals(question.getRightanswer()))
                        right++;
                }
            }
        }
        return new ResponseEntity<>(right,HttpStatus.OK);
    }

    public List<Quiz> getAllQuiz(String category) {
        return repo.getAllQuiz(category);
    }

    public ResponseEntity<List<Quiz>> AllQuiz() {
        try {
            List<Quiz> allquiz = repo.findAll();
            return new ResponseEntity<>(allquiz,HttpStatus.OK);
        }
        catch(Exception e){
            e.printStackTrace();
        }
        return new ResponseEntity<>(new ArrayList<>(),HttpStatus.BAD_REQUEST);
    }
}
