import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  nbr: number

  constructor(private http: HttpClient) { }

  getRandomInt(max:number): number {
    return Math.floor(Math.random() * max);
  }

  getQuestionJson() {
    this.nbr = this.getRandomInt(5)
    console.log("assets/questions/questions_" + this.nbr + ".json")
    return this.http.get<any>("assets/questions/questions_" + this.nbr + ".json");
  }


}
