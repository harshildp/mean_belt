import { Component, OnInit } from '@angular/core';
import { QaService } from '../qa.service';
import { Question } from '../question';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
questions: Question[];
name: String;
  constructor(private _qaService: QaService, private _router: Router) {
    this.name = _qaService.loggedUser;
  }

  ngOnInit() {
    this._qaService.getAll(questions => this.questions = questions)    
  }

  search(data) {
    console.log('Search form', data)
    let content = data.form.value
    this._qaService.search(content, res => {
      this.questions = res;
      console.log('Questions after', this.questions)
    })
  }
  logout() {
    this._qaService.logout(res => {
      console.log(res)
      this._router.navigate(['/'])
    });
  }
}
