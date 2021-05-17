import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

interface IRole {
  value: string;
  viewValue: string;
}
interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
}
@Component({
  selector: 'app-sing-up',
  templateUrl: './sing-up.component.html',
  styleUrls: ['./sing-up.component.css'],
})
export class SingUpComponent implements OnInit {
  public url: string;
  public httpOptions: {};

  public generatedId: number;
  public name: string;
  public email: string;
  public pass: string;
  public confirmpass: string;
  public selectedValue: string;
  public User: IUser;

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  roles: IRole[] = [
    { value: 'admin', viewValue: 'Admin' },
    { value: 'author', viewValue: 'Author' },
    { value: 'user', viewValue: 'User' },
    { value: 'publisher', viewValue: 'Publisher' },
  ];

  constructor(
    public dialog: MatDialog,
    public http: HttpClient,
    private _route: Router
  ) {
    this.httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      responseType: 'text',
    };
    this.url = `http://localhost:30001`;

    http: this.generatedId = 0;
    this.name = '';
    this.email = '';
    this.pass = '';
    this.confirmpass = '';
    this.selectedValue = '';

    this.User = {
      id: this.generatedId,
      name: this.name,
      email: this.email,
      password: this.pass,
      role: this.selectedValue,
    };

    this.http.get<IUser[]>(`${this.url}/users`).subscribe((data) => {
      this.generatedId = data.length + 1;
    });
  }

  ngOnInit(): void {}

  saveUser = (): void => {
    if (
      this.name.toString().length &&
      this.email.toString().length &&
      this.pass.toString().length &&
      this.confirmpass.toString().length &&
      this.selectedValue.toString().length
    ) {
      if (this.checkPass()) {
        this.valueSetter();
        this.http
          .post(`${this.url}/users`, this.User, this.httpOptions)
          .subscribe((data) => {
            this._route.navigateByUrl('/');
          });
      }
    }
  };

  checkPass = (): boolean => {
    if (!(this.pass === this.confirmpass)) {
      this.dialog.open(ErrorDialog);
      return false;
    } else {
      return true;
    }
  };

  valueSetter = (): void => {
    this.User['id'] = this.generatedId;
    this.User['name'] = this.name;
    this.User['password'] = this.pass;
    this.User['email'] = this.email;
    this.User['role'] = this.selectedValue;
  };
}
@Component({
  selector: 'error-dialog',
  template: `
    <h1 mat-dialog-title>Error!</h1>
    <div mat-dialog-content>Password must match</div>
  `,
})
export class ErrorDialog {}
