import { Component, OnInit } from '@angular/core';
import { Question } from '../question';
import { Router, ActivatedRoute } from '@angular/router';
import { QaService } from '../qa.service';
@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
currentQuestion: Question;
qid: String;

  constructor(private _route: ActivatedRoute,
    private _qaService: QaService,
    private _router: Router) { }

  ngOnInit() {
    this._route.paramMap.subscribe( params => {
      console.log('Question id', params.get('qid'))
      this._qaService.getQuestion(params.get('qid'), res => {
        this.qid = params.get('qid')
        this.currentQuestion = res;
        console.log('After currentQuestion', this.currentQuestion)
      });
    })
  }

  logout() {
    this._qaService.logout(res => {
      console.log(res)
      this._router.navigate(['/'])
    });
  }

  like(aid){
    this._qaService.like(this.qid, aid, res => {
      this._qaService.getQuestion(this.qid, ret => {
        this.currentQuestion = ret;
        console.log('updated', this.currentQuestion)
      });
    })
    console.log('liked answer')
  }
}
