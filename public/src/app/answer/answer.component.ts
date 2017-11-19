import { Component, OnInit } from '@angular/core';
import { Question } from '../question';
import { Answer } from '../answer';
import { Router, ActivatedRoute } from '@angular/router';
import { QaService } from '../qa.service';
@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.css']
})
export class AnswerComponent implements OnInit {
currentQuestion: Question;
newAnswer: Answer;
  constructor(private _route: ActivatedRoute,
    private _qaService: QaService,
    private _router: Router) {
      this.newAnswer = new Answer();
      this.newAnswer.author = this._qaService.loggedUser;
    }

  ngOnInit() {
    this._route.paramMap.subscribe( params => {
      console.log('Question id', params.get('qid'))
      this._qaService.getQuestion(params.get('qid'), res => {
        this.currentQuestion = res;
        console.log('After currentQuestion', this.currentQuestion)
      });
    })
  }

  goBack() {
    this._router.navigate([`/questions/${this.currentQuestion._id}`])
  }

  submitAnswer() {
    this._qaService.submitAnswer(this.newAnswer, this.currentQuestion._id, res=> {
      this.newAnswer = new Answer();
      console.log(res)
      this._router.navigate(['/dashboard'])
    })
  }

  logout() {
    this._qaService.logout(res => {
      console.log(res)
      this._router.navigate(['/'])
    });
  }
}
