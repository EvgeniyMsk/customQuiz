import { Component, OnInit } from '@angular/core';
import {QuestionService} from "../service/question.service";
import {interval} from "rxjs";

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  public name: string = "";
  public questionList: any = []
  public currentQuestion: number = 0
  public points: number = 0
  public counter: number = 60
  correctAnswer: number = 0
  incorrectAnswer: number = 0
  progress: string
  isQuizCompleted: boolean = false

  constructor(public questionService: QuestionService) { }

  ngOnInit(): void {
    this.name = localStorage.getItem("name")!;
    this.getAllQuestions();
  }

  getAllQuestions() {
    this.questionService.getQuestionJson()
      .subscribe(response => {
        this.questionList = response.questions;
      })
  }

  nextQuestion() {
    this.currentQuestion++;
  }

  prevQuestion() {
    this.currentQuestion--;
  }

  answer(currentQuestionNumber: number, option: any) {
    if (currentQuestionNumber === this.questionList.length) {
      this.isQuizCompleted = true
    }
    if (option.correct) {
      this.points += 1;
      this.correctAnswer++;
      setTimeout(() => {
        this.currentQuestion++;
        this.getProgressPercent()
      }, 100)
    } else {
      setTimeout(() => {
        this.incorrectAnswer++;
        this.currentQuestion++;
        this.getProgressPercent()
      }, 100)
      // this.points -= 1;
    }
  }

  resetQuiz() {
    this.getAllQuestions()
    this.points = 0
    this.counter = 60
    this.currentQuestion = 0
    this.progress = "0"
  }

  getProgressPercent() {
    this.progress = (((this.currentQuestion + 1)/this.questionList.length) * 100).toString()
    return this.progress
  }
}
