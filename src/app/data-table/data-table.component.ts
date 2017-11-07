import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../domain/user';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit {
  @Input() url: string;
  @Input() pageSize: number;
  currentPage = 1;
  users: User[];
  loading = true;
  constructor(private http: HttpClient) { }

  ngOnInit() {
    setTimeout(() => {
      this.http.get<User[]>(this.url + '?page=' + this.currentPage + '&size=' + this.pageSize).subscribe(data => {
        this.users = data;
        this.currentPage++;
        this.loading = false;
      });
    }, 1000);
  }

  loadNext() {
    this.http.get<User[]>(this.url + '?page=' + this.currentPage + '&size=' + this.pageSize).subscribe(data => {
      this.users = data;
      this.currentPage++;
    });
  }
}
