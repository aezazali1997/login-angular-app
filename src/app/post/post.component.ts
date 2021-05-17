import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export interface IPost {
  id: number;
  title: string;
  desc: string;
}
let ELEMENT_DATA: IPost[] = [];
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
  public httpOptions = {};
  public url: string = `http://localhost:30001/posts`;
  displayedColumns: string[] = ['id', 'title', 'description'];
  public dataSource: IPost[] = [];
  public generatedId: number = 0;
  public title: string = '';
  public desc: string = '';
  public objData: IPost = {
    id: this.generatedId,
    title: this.title,
    desc: this.desc,
  };

  constructor(private _http: HttpClient) {
    this.getData();
    this.httpOptions = {
      header: new HttpHeaders({ 'Content-type': 'Application/json' }),
      responseType: 'text',
    };
  }

  ngOnInit(): void {}
  getData = (): void => {
    this._http.get<IPost[]>(this.url).subscribe((Alldata) => {
      this.generatedId = Alldata.length + 1;
      Alldata.forEach((data) => {
        ELEMENT_DATA.push(data);
      });
      this.dataSource = ELEMENT_DATA;
    });
  };
  savePost = (): void => {
    this.objData['id'] = this.generatedId;
    this.objData['title'] = this.title;
    this.objData['desc'] = this.desc;
    try {
      this._http
        .post(this.url, this.objData, this.httpOptions)
        .subscribe((data) => {
          console.log(data);
          this.getData();
        });
    } catch (er) {
      console.log(er);
    }
  };
}
