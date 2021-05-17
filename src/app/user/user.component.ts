import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
export interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
}
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  public url = `http://localhost:30001/users`;
  public users: IUser[] = [];
  public dataSource: IUser[] = [];
  public displayedColumns: string[] = [
    'id',
    'name',
    'email',
    'password',
    'role',
  ];

  constructor(private _http: HttpClient) {
    this.loadData();
  }

  ngOnInit(): void {}
  loadData = (): void => {
    this._http.get<IUser[]>(this.url).subscribe((data) => {
      data.forEach((dt) => {
        this.users.push(dt);
      });
      this.dataSource = this.users;
    });
  };
}
