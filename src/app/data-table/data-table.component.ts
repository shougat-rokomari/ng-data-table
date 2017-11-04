import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../domain/user';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit {
  users: User[];
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get<User[]>('https://jsonplaceholder.typicode.com/users').subscribe(data => {
      this.users = data;
    });
  }

}
