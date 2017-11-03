import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get('https://jsonplaceholder.typicode.com/users').subscribe(data => {
      console.log(data);
    });
  }

}
