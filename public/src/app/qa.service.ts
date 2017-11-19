import { Injectable } from '@angular/core';
import { Question } from './question';
import { Http } from '@angular/http';
@Injectable()
export class QaService {
allQuestions: Question[];
loggedUser: String;

  constructor(private _http: Http) { }

  login(data, cb){
    this._http.post('/login', data).subscribe(
      res => {this.loggedUser = data.name; cb(res.json())},
      err => console.log(err)
    )
  }
  
  search(data, cb) {
    if (data.search.length > 0) {
      let ret = []
      for(let i = 0; i < this.allQuestions.length; i++) {
          if (this.allQuestions[i].question.toLowerCase().includes(data.search.toLowerCase())){
              ret.push(this.allQuestions[i])
          }
      }
      console.log('Service filtered questions', ret)
      return cb(ret);
    } else {
      return cb(this.allQuestions);
    }
  }

  getAll(cb){
    this._http.get('/dashboard').subscribe(
      res => { 
        console.log(res.json())
        this.allQuestions = res.json()         
        cb(res.json())
      },
      err => console.log(err)
    )
  }

  logout(cb) {
    this._http.get('/logout').subscribe(
      res => {this.loggedUser = ''; cb(res.json())},
      err => console.log(err)
    )
  }

  postQuestion(data, cb) {
    this._http.post('/questions/add', data).subscribe(
      res => cb(res.json()),
      err => console.log(err)
    )
  }

  submitAnswer(data, qid, cb) {
    this._http.post(`/questions/answer/${qid}`, data).subscribe(
      res => cb(res.json()),
      err => console.log(err)
    )
  }

  getQuestion(qid, cb) {
    this._http.get(`/questions/${qid}`).subscribe(
      res => cb(res.json()),
      err => console.log(err)
    )
  }

  like(qid, aid, cb){
    this._http.get(`/questions/like/${aid}`).subscribe(
      res => cb(res.json()),
      err => console.log(err)
    )
  }
}
