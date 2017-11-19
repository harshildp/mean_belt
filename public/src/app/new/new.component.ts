import { Component, OnInit } from '@angular/core';
import { Question } from '../question';
import { QaService } from '../qa.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
newQuestion: Question;
  constructor(private _router: Router, private _qaService: QaService) {
    this.newQuestion = new Question()
  }

  ngOnInit() {
  }

  postQuestion() {
    this._qaService.postQuestion(this.newQuestion, res=> {
      this.newQuestion = new Question();
      console.log(res)
      this.goBack();
    })
  }

  logout() {
    this._qaService.logout(res => {
      console.log(res)
      this._router.navigate(['/'])
    });
  }

  goBack(){
    this._router.navigate(['/dashboard']);
  }
}
