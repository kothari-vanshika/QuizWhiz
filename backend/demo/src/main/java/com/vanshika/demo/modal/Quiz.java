package com.vanshika.demo.modal;

import jakarta.persistence.*;

import java.util.List;

@Entity
public class Quiz {

    @Id
    @GeneratedValue(strategy= GenerationType.SEQUENCE)
    private int id;
    private String category;
    private int num;
    private String title;

    @ManyToMany
    private List<Question> questions;

    public Quiz(){

    }
    public Quiz(int id, String category,int num,String title, List<Question> questions) {
        this.id = id;
        this.category=category;
        this.num=num;
        this.title = title;
        this.questions = questions;


    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public int getNum() {
        return num;
    }

    public void setNum(int num) {
        this.num = num;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public List<Question> getQuestions() {
        return questions;
    }

    public void setQuestions(List<Question> questions) {
        this.questions = questions;
    }
}
