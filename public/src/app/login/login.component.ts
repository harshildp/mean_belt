import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QaService } from '../qa.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private _qaService: QaService, private _router: Router) { }

  ngOnInit() {
  }

  login(data) {
    console.log('login', data.form.value);
    this._qaService.login(data.form.value, res=>
    this._router.navigate(['/dashboard'])
    )
  }
}
