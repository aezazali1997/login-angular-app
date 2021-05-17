import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
interface ISelection {
  value: string;
  viewValue: string;
}
interface ICredentials {
  email: string;
  password: string;
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public httpOptions = {};
  public credentials: ICredentials;
  public url: string;
  public pass: string;
  public selectedValue: string;
  public email: string;
  selections: ISelection[] = [
    { value: 'all users', viewValue: 'All users' },
    { value: 'search user', viewValue: 'Search User' },
    { value: 'all posts', viewValue: 'All Posts' },
    { value: 'search post', viewValue: 'Search Post' },
  ];
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  constructor(private http: HttpClient, private _route: Router) {
    this.httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      responseType: 'text',
    };
    this.url = `http://localhost:30001/auth/login`;
    this.pass = '';
    this.email = '';
    this.credentials = {
      email: this.email,
      password: this.pass,
    };
    this.selectedValue = '';
  }
  ngOnInit(): void {}

  Login = (): void => {
    this.credentials['email'] = this.email;
    this.credentials['password'] = this.pass;
    try {
      this.http.post(this.url, this.credentials).subscribe((data) => {
        if (data) {
          this._route.navigateByUrl('/posts');
        }
      });
    } catch (er) {
      console.log(er);
    }
  };
}
